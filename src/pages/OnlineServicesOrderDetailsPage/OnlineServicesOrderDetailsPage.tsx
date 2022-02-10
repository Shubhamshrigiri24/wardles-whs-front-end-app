/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { Selector, useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { Container } from "@material-ui/core";
import SubscriptionsApi from "utils/api/SubscriptionsAPI";
import { formatThreeDS } from "pages/OnlineServicesCheckoutPaymentPage/helpers";
import { ACCOUNT_ORDERS_PATH } from "constants/paths";
import { getOrderById as getOrderByIdAction } from "app/store/reducer/orders/actions";
import { getSubscriptionById as getSubscriptionByIdAction } from "app/store/reducer/subscriptions/actions";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";
import {
  getSubscriptionById,
  getSubscriptionsStatus,
} from "../../app/store/reducer/subscriptions/selectors";
import {
  getOrderById,
  getOrdersStatus,
} from "../../app/store/reducer/orders/selectors";

import BraintreeAPI from "utils/api/BraintreeAPI";

import { Typography, Alert, Divider } from "@welldigital/components";
import { Loader } from "../../components";
import AppModal from "components/AppModal";

import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import OrderSummaryCard from "components/OrderSummaryCard";
import DeliveryInfo from "pages/OnlineServicesOrderDetailsPage/DeliveryInfo";
import ActionsBar from "pages/OnlineServicesOrderDetailsPage/ActionsBar";
import SubscriptionStatusInfo from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo";
import {
  OrderDetailsProduct,
  OrderType,
  OrderPricingType,
} from "pages/OnlineServicesOrderDetailsPage/types";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";
import { ACTION_STATUSES, TActionStatus } from "app/store/types";
import { TOrder } from "app/store/reducer/orders/types";
import { TSubscription } from "app/store/reducer/subscriptions/types";
import PaymentMethod from "./PaymentMethod";
import ChangePaymentMethod from "./ChangePaymentMethod";

interface Props {}

type TParams = {
  orderType: string;
  id: string;
};

type TActionSwitcher = {
  [key in OrderType]: {
    getEntityById: Selector<any, TOrder | TSubscription | undefined, string>;
    getEntityByIdAction: Function;
    getEntityStatus: Selector<any, TActionStatus>;
  };
};

const TYPE_DEPENDANT_FUNCTIONS: TActionSwitcher = {
  subscription: {
    getEntityById: getSubscriptionById,
    getEntityByIdAction: getSubscriptionByIdAction,
    getEntityStatus: getSubscriptionsStatus,
  },
  order: {
    getEntityById: getOrderById,
    getEntityByIdAction: getOrderByIdAction,
    getEntityStatus: getOrdersStatus,
  },
};

export const OnlineServicesOrderDetailsPage: React.FC<Props> = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isChangePaymentState, setIsChangePaymentState] = useState(false);
  const [braintreeToken, setBraintreeToken] = useState("");
  const [isFetchingBraintreeToken, setIsFetchingBraintreeToken] =
    useState(true);
  const [braintreeTokenErrorMessage, setBraintreeTokenErrorMessage] =
    useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const params: TParams = useParams();

  const orderType: any = params?.orderType ?? "order";
  const orderId = params?.id;
  const { getEntityById, getEntityByIdAction, getEntityStatus } =
    TYPE_DEPENDANT_FUNCTIONS[orderType as OrderType];

  const order = useSelector((state) => getEntityById(state, orderId));

  const orderlikeEntityLoadStatus = useSelector(getEntityStatus);

  const fetchBraintreeToken = useCallback(async () => {
    try {
      setIsFetchingBraintreeToken(true);
      const response = await BraintreeAPI.getToken();
      const data = response.data;

      if (data.token) {
        setBraintreeToken(data.token);
      } else {
        setBraintreeTokenErrorMessage(
          `Failed to initialise payment! ${data.message || ""}`
        );
      }
    } catch (err) {
      console.error("Failed to initialise payment!", err);
      setBraintreeTokenErrorMessage("Failed to initialise payment!");
    } finally {
      setIsFetchingBraintreeToken(false);
    }
  }, []);

  const performPageDataRefetch = useCallback(() => {
    setIsPageLoading(true);
    dispatch(getEntityByIdAction(orderId));
    if (orderType === OrderType.SUBSCRIPTION) {
      fetchBraintreeToken();
    }
  }, [orderType, orderId]);

  const toggleModalState = useCallback(() => {
    setIsModalOpen((prevState) => {
      if (!prevState === true) {
        analytics.trackEvent({
          flow: "subscription",
          event: eventsBuilder.account.cancelSubscriptionLink,
        });
      }
      return !prevState;
    });
  }, [order]);

  const onSubscriptionCancel = useCallback(async () => {
    setErrorMessage("");
    try {
      await SubscriptionsApi.cancelSubscription(orderId);

      if (order) {
        const product = order.products[0].product;
        analytics.trackEvent({
          flow: "subscription",
          event: eventsBuilder.account.cancelSubscriptionConfirm,
          metadata: {
            productName: product?.name,
            productSku: product?.sku,
            packSize: product?.itemsPerPack,
            orderId: order.id,
          },
        });
      }
      performPageDataRefetch();
    } catch (err) {
      setErrorMessage(
        "An error occurred when canceling your subscription. Please try again."
      );
    }
    setIsModalOpen(false);
  }, [order]);

  const onBack = useCallback(() => {
    isChangePaymentState
      ? setIsChangePaymentState(false)
      : history.push(
          generatePath(ACCOUNT_ORDERS_PATH, {
            orderType:
              orderType === OrderType.SUBSCRIPTION ? "subscriptions" : "orders",
          })
        );
  }, [history, isChangePaymentState]);

  const onChangePaymentMethod = useCallback(() => {
    setIsChangePaymentState(true);
    analytics.trackEvent({
      flow: "subscription",
      event: eventsBuilder.payment.changePaymentMethod,
    });
  }, []);

  useEffect(() => {
    if (order?.products) {
      const product = order.products[0].product;

      order.type === OrderType.SUBSCRIPTION
        ? analytics.trackEvent({
            flow: "subscription",
            event: eventsBuilder.account.orderDetails,
            metadata: {
              productName: product?.name,
              productSku: product?.sku,
              packSize: product?.itemsPerPack,
              orderId: order.id,
            },
          })
        : analytics.trackEvent({
            flow: "subscription",
            event: eventsBuilder.account.orderDetails,
            metadata: {
              productName: product?.name,
              productSku: product?.sku,
              packSize: product?.itemsPerPack,
              orderId: order.id,
              subscription: `${
                product?.subscription ? "with" : "without"
              } subscription`,
            },
          });
    }
  }, [order]);

  useEffect(() => {
    performPageDataRefetch();
  }, []);

  useLayoutEffect(() => {
    const isOrderlikeEntityLoaded =
      orderlikeEntityLoadStatus === ACTION_STATUSES.LOADED;
    const isOrderlikeEntityLoading =
      orderlikeEntityLoadStatus === ACTION_STATUSES.PENDING;
    const hasAnyCallFailed =
      orderlikeEntityLoadStatus === ACTION_STATUSES.FAILED;

    const isMaybeFetchingBraintreeToken =
      orderType === OrderType.SUBSCRIPTION && isFetchingBraintreeToken;
    // this is necessary because some statuses can be LOADED from redux on initial load and the loading spinner is invalidated at first render
    if (
      (isOrderlikeEntityLoading || isMaybeFetchingBraintreeToken) &&
      !isPageLoading
    ) {
      setIsPageLoading(true);
    }

    if (
      (isOrderlikeEntityLoaded && !isMaybeFetchingBraintreeToken) ||
      (hasAnyCallFailed && !isMaybeFetchingBraintreeToken)
    ) {
      setIsPageLoading(false);
    }
  }, [orderlikeEntityLoadStatus, isFetchingBraintreeToken]);

  const classes = useStyles();

  if (!isPageLoading && order && order.content) {
    const product: OrderDetailsProduct = order?.products[0].product || {};
    const pricing: OrderPricingType = order?.price || {};
    const customer = order?.customer;
    const shippingAddress = customer?.shippingAddress;

    const orderInfo =
      order?.type === OrderType.INDIVIDUAL_ORDER
        ? [[order.content[0], order.content[1]], [order.content[2]]]
        : [
            [order.content[1], order.content[2], order.content[3]],
            [order.content[0], { label: "Subscription ID", value: order.id }],
          ];

    const isSubscription = order?.type === OrderType.SUBSCRIPTION;

    return (
      <GeneralLayout>
        <Container maxWidth={"xs"} className={classes.pageContainer}>
          <ActionsBar
            isSubscription={isSubscription}
            isChangePaymentState={isChangePaymentState}
            subscriptionStatus={order?.status}
            onBack={onBack}
            onCancelSubscriptionLinkClicked={toggleModalState}
          />
          {errorMessage && (
            <Alert message={errorMessage} type={"error"} spacingAfter={6} />
          )}

          {!isChangePaymentState && (
            <>
              <OrderSummaryCard
                image={product?.productInfo.imageURI ?? ""}
                type={order.typeLabel}
                name={product?.productInfo.productName ?? ""}
                info={orderInfo}
              />
              <Divider spacingAfter={4} />

              {isSubscription && (
                <>
                  <SubscriptionStatusInfo
                    status={order?.status}
                    performPageDataRefetch={performPageDataRefetch}
                    onError={setErrorMessage}
                    product={product}
                  />
                  {order?.status !== SUBSCRIPTION_STATUSES.CANCELLED && (
                    <PaymentMethod
                      lastFour={order?.paymentMethodDetails?.last4}
                      braintreeToken={braintreeToken}
                      braintreeTokenErrorMessage={braintreeTokenErrorMessage}
                      onChangePaymentMethod={onChangePaymentMethod}
                    />
                  )}
                </>
              )}

              {order?.status !== SUBSCRIPTION_STATUSES.CANCELLED && (
                <>
                  {order?.status ===
                    SUBSCRIPTION_STATUSES.PAUSED_FAILED_PAYMENT && (
                    <Alert
                      message={"There has been a problem with your payment"}
                      type={"error"}
                      spacingAfter={4}
                    />
                  )}
                  <DeliveryInfo
                    delivery={{
                      phone: customer?.phone || "phone",
                      email: customer?.email || "email",
                      firstName: customer?.firstName || "firstName",
                      lastName: customer?.lastName || "lastName",
                      postcode: shippingAddress?.postcode || "postcode",
                      addressline1: shippingAddress?.line1 || "addressline1",
                      addressline2: shippingAddress?.line2 || "",
                      city: shippingAddress?.city || "city",
                      product,
                      pricing,
                      shouldShowDeliveryInfo: order.type === "order",
                    }}
                  />
                </>
              )}
            </>
          )}
          {isChangePaymentState && braintreeToken && (
            <ChangePaymentMethod
              subscriptionId={orderId}
              brainTreeToken={braintreeToken}
              threeDSecure={formatThreeDS(
                { price: pricing.final },
                {
                  phone: customer?.phone || "",
                  email: customer?.email || "",
                  firstName: customer?.firstName || "",
                  lastName: customer?.lastName || "",
                  addressLine1: shippingAddress?.line1 || "",
                  addressLine2: shippingAddress?.line2 || "",
                  city: shippingAddress?.city || "",
                  postcode: shippingAddress?.postcode || "",
                }
              )}
              onBack={onBack}
              performPageDataRefetch={performPageDataRefetch}
            />
          )}
        </Container>
        <AppModal
          isOpen={isModalOpen}
          title={"Are you sure you want to cancel your subscription?"}
          onSuccess={onSubscriptionCancel}
          onBack={toggleModalState}
        >
          <Typography align={"center"} spacingAfter={4} color={"inherit"}>
            We’re sorry to hear that you’d like to cancel your subscription. We
            will process the cancellation, and your subscription will now show
            as cancelled in your account.
          </Typography>
          <Typography align={"center"} spacingAfter={2} color={"inherit"}>
            If you’ve recently confirmed nothing has changed with your health,
            your payment for this month’s subscription has been scheduled and
            you will still recieve your order.
          </Typography>
        </AppModal>
      </GeneralLayout>
    );
  } else {
    return (
      <GeneralLayout>
        <div className={classes.contentLoader}>
          <Loader />
        </div>
      </GeneralLayout>
    );
  }
};

export default OnlineServicesOrderDetailsPage;
