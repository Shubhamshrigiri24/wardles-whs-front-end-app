import React, { useEffect, useRef, useState, useCallback } from "react";
import BraintreeWebDropIn from "braintree-web-drop-in";
import { useHistory, useParams } from "react-router-dom";
import PaymentPanel, {
  BRAINTREE_CONTAINER_ID,
} from "../../components/PaymentPanel/PaymentPanel";
import { getCostStr } from "../../utils/utils";
import { CreateOrderInput } from "app/store/reducer/online/actions";
import {
  CustomerDetails,
  DeliveryDetails,
} from "app/store/reducer/checkout/types";
import {
  OnlineService,
  Pack,
  OnlineQuestion,
  OnlineServiceParamTypes,
  OnlineServiceIds,
} from "app/store/reducer/online/types";
import { analytics } from "@welldigital/ui-common/Analytics";

export interface OnlinePaymentPageStateProps {
  braintreeToken: string;
  successfulOrder: boolean;
  orderErrorMessage: string;
  customerDetails: CustomerDetails;
  basket: Pack;
  consultation: OnlineQuestion[];
  deliveryDetails: DeliveryDetails;
  selectedService: OnlineService;
  productToken: string | null;
}

export interface OnlinePaymentPageDispatchProps {
  onOrder(input: CreateOrderInput, endpoint?: string): void;
  invalidateProductToken(token: string): void;
  fetchBraintreeToken(): void;
  clearOrderFailureError(): void;
}

export type OnlinePaymentPageProps = OnlinePaymentPageStateProps &
  OnlinePaymentPageDispatchProps;

const Payment: React.FC<OnlinePaymentPageProps> = ({
  fetchBraintreeToken,
  braintreeToken,
  orderErrorMessage,
  successfulOrder,
  onOrder,
  invalidateProductToken,
  productToken,
  customerDetails,
  deliveryDetails,
  basket,
  consultation,
  selectedService,
  clearOrderFailureError,
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const instance = useRef<BraintreeWebDropIn.Dropin | null>(null);
  const { onlineServiceId } = useParams<OnlineServiceParamTypes>();

  const history = useHistory();

  useEffect(() => {
    clearOrderFailureError();
    if (!braintreeToken) {
      fetchBraintreeToken();
      return;
    }

    async function createInstance() {
      instance.current = await BraintreeWebDropIn.create({
        container: BRAINTREE_CONTAINER_ID,
        authorization: braintreeToken,
        threeDSecure: true,
      });

      if (instance.current.isPaymentMethodRequestable()) {
        setDisableButton(false);
      }

      instance.current?.on("paymentMethodRequestable", () => {
        setDisableButton(false);
      });

      instance.current?.on("noPaymentMethodRequestable", () => {
        setDisableButton(true);
      });
    }

    createInstance().catch((err) => {
      setPaymentError(`Could not begin payment because: ${err}`);
    });
    return () => {
      instance.current?.teardown();
    };
  }, [braintreeToken, fetchBraintreeToken, clearOrderFailureError]);

  useEffect(() => {
    if (successfulOrder) {
      if (onlineServiceId === OnlineServiceIds.hana && productToken) {
        invalidateProductToken(productToken);
      }
      analytics.trackEvent({
        flow: selectedService.id,
        event: "Payment complete",
      });
      history.push(`/online/${selectedService.id}/checkout/confirmation`);
    }
  }, [
    history,
    successfulOrder,
    selectedService.id,
    invalidateProductToken,
    productToken,
    onlineServiceId,
  ]);

  // this is necessary because order error is handled via REDUX and we need to clear the payment method in case of failure
  useEffect(() => {
    if (orderErrorMessage) {
      instance.current?.clearSelectedPaymentMethod();
    }
  }, [orderErrorMessage]);

  const onPay = useCallback(async () => {
    setPaymentError("");
    clearOrderFailureError();
    try {
      setIsPaying(true);
      const payload = await instance.current?.requestPaymentMethod({
        threeDSecure: {
          amount: getCostStr(basket.price),
          mobilePhoneNumber: customerDetails.phone,
          email: customerDetails.email,
          billingAddress: {
            givenName: customerDetails.firstName,
            surname: customerDetails.lastName,
            phoneNumber: customerDetails.phone,
            streetAddress: customerDetails.line1,
            extendedAddress: customerDetails.line2,
            locality: customerDetails.city,
            postalCode: customerDetails.postcode,
            countryCodeAlpha2: "GB",
          },
        },
      });
      if (!payload) {
        throw new Error("Braintree PaymentMethodPayload was not defined");
      }

      if (!payload.liabilityShifted) {
        instance.current?.clearSelectedPaymentMethod();
        setPaymentError(
          "We were unable to complete your 3DSecure check, please try a different payment method"
        );
        setIsPaying(false);
        return;
      }

      const createOrderInput: CreateOrderInput = {
        paymentNonce: payload.nonce,
        customerDetails,
        deliveryDetails,
        basket: [basket],
        consultation,
      };
      await onOrder(createOrderInput);
    } catch (err) {
      console.error(err);
      instance.current?.clearSelectedPaymentMethod();
      setPaymentError((err as any).message);
    } finally {
      setIsPaying(false);
    }
  }, [
    basket,
    customerDetails,
    consultation,
    deliveryDetails,
    onOrder,
    clearOrderFailureError,
  ]);

  return (
    <PaymentPanel
      onPay={onPay}
      loading={!braintreeToken || isPaying}
      paymentErrorMessage={paymentError || orderErrorMessage}
      disableButton={disableButton}
      isPaying={isPaying}
    />
  );
};

export default Payment;
