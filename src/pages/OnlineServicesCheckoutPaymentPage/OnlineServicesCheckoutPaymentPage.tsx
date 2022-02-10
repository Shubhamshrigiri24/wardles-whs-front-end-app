import React, { useEffect, useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import BraintreeWebDropIn from "braintree-web-drop-in";
import { CircularProgress } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { analytics } from "@welldigital/ui-common/Analytics";
import { eventsBuilder } from "utils/events";
import { Typography, Button, Alert, wellColors } from "@welldigital/components";
import { useAuthentication } from "@welldigital/ui-common/Authentication";
import { ALL_STEPS, Stepper, StepperSteps } from "components/Stepper";
import { useStyles } from "./styles";
import BraintreeAPI from "../../utils/api/BraintreeAPI";
import { useDispatch, useSelector } from "react-redux";
import { formatOrder, formatThreeDS } from "./helpers";
import {
  getCustomer,
  getProduct,
} from "../../app/store/reducer/order/selectors";

import { getOnlineConsultation } from "../../app/store/selectors";
import OrdersAPI from "../../utils/api/OrdersAPI";
import { AxiosResponse } from "axios";
import { SetProductAction as setProduct } from "../../app/store/reducer/order/actions";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import OrderBasketWrapper from "app/layouts/OrderBasketWrapper";
import { getCookieObject } from "utils/cookieParser";

const braintreeContainerId = "braintree_container";
export const BRAINTREE_CONTAINER_ID = `#${braintreeContainerId}`;

interface Props {}

export const OnlineServicesCheckoutPaymentPage: React.FC<Props> = () => {
  const [braintreeToken, setBrainTreeToken] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isOrderSuccessfull, setIsOrderSuccessfull] = useState(false);
  const instance = useRef<BraintreeWebDropIn.Dropin | null>(null);

  const product = useSelector(getProduct);
  const customer = useSelector(getCustomer);
  const consultation = useSelector(getOnlineConsultation);
  const selectedPack = product?.packs[0] || ({} as any);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { email } = useAuthentication();

  const handlePaymentTracking = useCallback(
    (errorMessage?: string) => {
      if (product) {
        const cookieObject = getCookieObject();

        const cookieToSpread: any = {};

        if (cookieObject._gaexp) {
          const cookieValues = cookieObject._gaexp.split(".");
          cookieToSpread.experimentId = cookieValues[2];
          cookieToSpread.experimentVariant = cookieValues[4];
        }

        errorMessage
          ? analytics.trackEvent({
              flow: product.service,
              event: eventsBuilder.payment.paymentFailed,
              metadata: {
                ...(errorMessage ? { error: errorMessage } : {}),
              },
            })
          : analytics.trackEvent({
              flow: product.service,
              event: eventsBuilder.payment.paymentComplete,
              metadata: {
                productName: product?.name,
                productSku: product?.packs[0].sku,
                packSize: product?.packs[0].itemsPerPack,
                subscription: `${
                  product?.subscription ? "with" : "without"
                } subscription`,
                ...cookieToSpread,
              },
            });
      }

      if (product?.subscription && !errorMessage) {
        analytics.trackEvent({
          flow: product.service,
          event: eventsBuilder.payment.paymentWithSubcomplete,
          metadata: {
            productName: product?.name,
            productSku: product?.packs[0].sku,
            packSize: product?.packs[0].itemsPerPack,
          },
        });
      }
    },
    [product]
  );

  const fetchBraintreeToken = useCallback(async () => {
    try {
      const response = await BraintreeAPI.getToken();
      const data = response.data;

      if (data.token) {
        setBrainTreeToken(data.token);
      } else {
        setPaymentError(
          `Error occurred when initializing braintree! ${data.message || ""}`
        );
      }
    } catch (err) {
      handlePaymentTracking("");
      console.error("Failed to initialise braintree!", err);
      setPaymentError("Failed to initialise braintree!");
    }
  }, [handlePaymentTracking]);

  const onOrder = useCallback(
    async (input: any) => {
      try {
        const response = (await OrdersAPI.createOrder(input)) as AxiosResponse;

        const data = response.data;

        if (data.orderNumber || data.subscriptionNumber) {
          dispatch(
            setProduct({
              orderId: data.orderNumber || data.subscriptionNumber,
              id: product?.id || "",
              name: product?.name || "",
              packs: product?.packs || [],
              service: product?.service || "",
              variant: product?.variant || "",
              subscription: product?.subscription || false,
              delivery: product?.delivery || "",
              image: product?.image || "",
            })
          );

          handlePaymentTracking();
          analytics.trackRevenue(selectedPack.sku, selectedPack.price, 1);
          setIsOrderSuccessfull(true);
        } else {
          instance.current?.clearSelectedPaymentMethod();
          handlePaymentTracking(
            "Error occurred when submitting payment request"
          );
          setPaymentError(
            `Error occurred when submitting the request! ${data.message || ""}`
          );
        }
      } catch (err) {
        handlePaymentTracking("Failed to complete order!");
        console.error("Failed to complete order!", err);
        instance.current?.clearSelectedPaymentMethod();
        setPaymentError("Failed to complete order!");
      } finally {
        setIsPaying(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, product]
  );

  const customerDetails = customer?.customerDetails || ({} as any);

  const onPay = useCallback(async () => {
    setPaymentError("");
    try {
      setIsPaying(true);
      const payload: any = await instance.current?.requestPaymentMethod({
        threeDSecure: formatThreeDS(selectedPack, customerDetails),
      });

      if (!payload) {
        throw new Error("Braintree PaymentMethodPayload was not defined");
      }

      if (!payload.liabilityShifted) {
        instance.current?.clearSelectedPaymentMethod();
        handlePaymentTracking("3DSecure check failed");
        setPaymentError(
          "We were unable to complete your 3DSecure check, please try a different payment method"
        );
        setIsPaying(false);
        return;
      }

      const discountCodes = product?.packs?.[0].discounts
        ?.map((discount) => discount.code)
        .filter((code) => code !== "subscription");

      const orderBody = formatOrder(
        payload.nonce,
        product,
        selectedPack,
        customerDetails,
        consultation,
        email,
        {
          last4: payload.details.lastFour,
        },
        discountCodes ?? []
      );

      onOrder(orderBody);
    } catch (err) {
      handlePaymentTracking("An exception occurred while paying!");
      console.error("An exception occurred while paying! (onPay)", err);
      instance.current?.clearSelectedPaymentMethod();
      setPaymentError("An exception occurred while paying!");
      setIsPaying(false);
    }
  }, [
    product,
    email,
    customerDetails,
    selectedPack,
    consultation,
    onOrder,
    handlePaymentTracking,
  ]);

  useEffect(() => {
    setPaymentError("");

    if (!braintreeToken) {
      fetchBraintreeToken();
      return;
    }

    async function createInstance() {
      instance.current = await BraintreeWebDropIn.create({
        container: BRAINTREE_CONTAINER_ID,
        authorization: braintreeToken,
        threeDSecure: true,
        vaultManager: true,
        card: {
          overrides: {
            styles: {
              input: {
                padding: "16px",
                color: wellColors.elixir[400],
              },
              ".number": {
                "font-family": "monospace",
                "font-weight": 500,
                "font-size": "18px",
              },
              "input:focus": {
                color: wellColors.elixir[400],
              },
            },
          },
        },
      });

      if (instance.current.isPaymentMethodRequestable()) {
        setIsButtonDisabled(false);
      }

      instance.current?.on("paymentMethodRequestable", (event) => {
        // this should always be false because when we have token with saved methods the event.paymentMethodIsSelected is true and when we don't have a payment method saved then  event.paymentMethodIsSelected is false , but in both cases we need to be able to press the button and is not reliable -- see braintree docs for further clarifications if needed
        //https://developer.paypal.com/braintree/docs/guides/drop-in/customization
        setIsButtonDisabled(false);
      });
      instance.current?.on("noPaymentMethodRequestable", () => {
        setIsButtonDisabled(true);
      });
    }

    createInstance().catch((err) => {
      console.error("Could not begin payment!", err);
      setPaymentError("Could not begin payment!");
    });

    return () => {
      instance.current?.teardown();
    };
  }, [braintreeToken, fetchBraintreeToken, handlePaymentTracking]);

  useEffect(() => {
    if (isOrderSuccessfull) {
      history.push("/order/ed/confirmation");
      setIsOrderSuccessfull(false);
    }
  }, [history, isOrderSuccessfull, product]);

  return (
    <GeneralLayout>
      <Stepper
        classes={{ container: classes.stepper }}
        steps={ALL_STEPS}
        currentStep={StepperSteps.PAYMENT_DETAILS}
      />
      <OrderBasketWrapper>
        <div className={classes.wrapper}>
          <div className={classes.pageContent}>
            <Typography
              className={classes.title}
              variant={"h2"}
              spacingAfter={2}
            >
              Payment
            </Typography>
            <Typography className={classes.subTitle} spacingAfter={2}>
              {product?.subscription
                ? "Your card details will be saved securely and we will apply to take payment for your subscription every month."
                : "Please enter your card details below."}
            </Typography>
            <div id={braintreeContainerId} />
            {paymentError && (
              <Alert type={"error"} message={paymentError} spacingAfter={2} />
            )}
            <div className={classes.flexContainer}>
              <Button
                variant={"text"}
                color={"default"}
                onClick={history.goBack}
              >
                <Typography style={{ color: wellColors.elixir[900] }}>
                  Back
                </Typography>
              </Button>
              <Button
                className={classes.payButton}
                fullWidth
                variant={"contained"}
                size={"large"}
                data-testid={"paymentPanel/payment-button"}
                color={"primary"}
                disabled={isButtonDisabled || isPaying}
                onClick={onPay}
                endIcon={<ChevronRight />}
              >
                {isPaying ? (
                  <div className={classes.loadingSpinnerCenter}>
                    <CircularProgress
                      size={"1em"}
                      className={classes.circularProgress}
                    />
                    Paying...
                  </div>
                ) : (
                  "Pay"
                )}
              </Button>
            </div>
          </div>
        </div>
      </OrderBasketWrapper>
    </GeneralLayout>
  );
};

export default OnlineServicesCheckoutPaymentPage;
