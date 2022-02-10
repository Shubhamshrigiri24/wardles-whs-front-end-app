/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useCallback, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCustomerAction,
  SetProductAction,
} from "app/store/reducer/order/actions";
import { getProduct } from "app/store/reducer/order/selectors";
import {
  Alert,
  Button,
  Divider,
  Form,
  InputField,
  Spacing,
  Typography,
  wellColors,
} from "@welldigital/components";
import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { URLS } from "@welldigital/ui-common/Authentication/envDerivedConstants";
import AppModal from "components/AppModal";
import {
  AUTHENTICATED_STATE,
  useAuthentication,
} from "@welldigital/ui-common/Authentication";
import { useLocationQuery } from "../../utils/utils";
import { goToURL } from "@welldigital/ui-common/Utils/navigation";
import { TERMS_AND_CONDITIONS_PATH } from "constants/paths";
import { LOGIN_TARGET } from "../../constants/login";
import { OrderProduct } from "app/store/reducer/order/types";
import {
  getSubscriptionsData,
  getSubscriptionsStatus,
} from "../../app/store/reducer/subscriptions/selectors";
import { getSubscriptions } from "../../app/store/reducer/subscriptions/actions";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";
import { TSubscription } from "../../app/store/reducer/subscriptions/types";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import OrderBasketWrapper from "app/layouts/OrderBasketWrapper";
import { ALL_STEPS, Stepper, StepperSteps } from "components/Stepper";
import { eventsBuilder } from "utils/events";
import { analytics } from "@welldigital/ui-common";
import { useStyles } from "./styles";

const ACCOUNT_DETAILS_PATH = "/order/ed/account-details";
const ORDERS_AND_SUBSCRIPTIONS_PATH = "/account/orders";
const PRODUCT_SELECTION_PATH = "/order/ed/product-selection";
const DEFAULT_REDIRECT = ORDERS_AND_SUBSCRIPTIONS_PATH;

const initialValues = {
  email: "",
};

const changeProductToOneTimeOrder = (
  product: NonNullable<OrderProduct>
): OrderProduct => {
  const selectedPack = product.packs[0];
  return {
    ...product,
    packs: [
      {
        ...selectedPack,
        discounts: [],
        price: selectedPack.basePrice,
      },
    ],
    subscription: false,
  };
};

const areAllSubscriptionsCancelled = (subscriptions: TSubscription[]) =>
  subscriptions.every((sub) => sub.status === SUBSCRIPTION_STATUSES.CANCELLED);

const isAtLeastOneSubscriptionNotCancelled = (subscriptions: TSubscription[]) =>
  subscriptions.some((sub) => sub.status !== SUBSCRIPTION_STATUSES.CANCELLED);

export const LoginOptionsPage: FC<{}> = () => {
  const history = useHistory();
  const [hasSubscriptionsRequestStarted, setHasSubscriptionsRequestStarted] =
    useState(false);
  const dispatch = useDispatch();
  const product = useSelector(getProduct);
  const [isGuestModalOpened, setIsGuestModalOpened] = useState(false);
  const [isSubscriptionModalOpened, setIsSubscriptionModalOpened] =
    useState(false);
  const subscriptionsStatus = useSelector(getSubscriptionsStatus);
  const subscriptionsData = useSelector(getSubscriptionsData) as any[];
  const { authenticatedState, isAuthenticating } = useAuthentication();
  const { redirect } = useLocationQuery();
  const classes = useStyles();

  const isSubscriptionProduct = product?.subscription;
  const hasSubscriptionsFetchError = subscriptionsStatus === "FAILED";
  // show the login form only if not loading and is not authenticated
  const shouldShowLoader =
    authenticatedState !== AUTHENTICATED_STATE.NO || isAuthenticating;

  const fetchSubscriptions = useCallback(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  const SUB_OPTIONS = {
    signIn: "signInWithSub",
    register: "registerWithSub",
    guestCheckout: "guestCheckoutWithSub",
  };

  const trackOption = (option: "signIn" | "register" | "guestCheckout") => {
    analytics.trackEvent({
      flow: "ed",
      event: eventsBuilder.loginOptions[option],
      metadata: {
        productName: product?.name,
        productSku: product?.packs[0].sku,
        packSize: product?.packs[0].itemsPerPack,
        subscription: `${
          product?.subscription ? "with" : "without"
        } subscription`,
      },
    });

    if (option === "signIn") {
      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.loginOptions.customerLogin,
        metadata: {
          source: "checkout",
          url: document.location.href,
        },
      });
    }

    if (product?.subscription) {
      let eventKey:
        | "signInWithSub"
        | "registerWithSub"
        | "guestCheckoutWithSub" = SUB_OPTIONS[option] as any;

      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.loginOptions[eventKey],
        metadata: {
          productName: product?.name,
          productSku: product?.packs[0].sku,
          packSize: product?.packs[0].itemsPerPack,
        },
      });
    }
  };

  const trackSignIn = () => {
    trackOption("signIn");
  };

  const trackRegister = () => {
    trackOption("register");
  };

  const trackGuestCheckout = () => {
    trackOption("guestCheckout");
  };

  useEffect(() => {
    (async () => {
      if (authenticatedState !== AUTHENTICATED_STATE.YES) {
        return;
      }

      if (!hasSubscriptionsRequestStarted) {
        setHasSubscriptionsRequestStarted(true);
        fetchSubscriptions();
      } else {
        if (subscriptionsStatus === "PENDING") {
          // pass
          // displayed in markup as loader
        } else if (hasSubscriptionsFetchError) {
          // pass
          // displayed markup as error alert
        } else if (!product) {
          // if !product that means user accessed the page directly (ex: via bookmark)
          // user must not stay on this page if already authenticated
          history.replace(redirect ?? DEFAULT_REDIRECT);
        } else if (
          !isSubscriptionProduct ||
          subscriptionsData.length === 0 ||
          areAllSubscriptionsCancelled(subscriptionsData)
        ) {
          // when simple order or is first subscription
          // or is new subscription and all existing subscriptions are CANCELLED
          // continue to account details page
          history.replace(redirect ?? ACCOUNT_DETAILS_PATH);
        } else if (
          // if existing subscriptions and at least one is NOT CANCELLED
          // keep showing loader and show existing subscription modal
          subscriptionsData.length > 0 &&
          isAtLeastOneSubscriptionNotCancelled(subscriptionsData)
        ) {
          // will show loader + modal
          setIsSubscriptionModalOpened(true);
        } else {
          throw new Error(
            "Should not reach unhandled authenticated state scenario!"
          );
        }
      }
    })();
  }, [
    redirect,
    history,
    authenticatedState,
    subscriptionsStatus,
    hasSubscriptionsRequestStarted,
    fetchSubscriptions,
    hasSubscriptionsFetchError,
    isSubscriptionProduct,
    product,
    subscriptionsData,
  ]);

  const onFormSubmit = useCallback(
    async (values) => {
      dispatch(
        SetCustomerAction({
          customerType: "EXISTING",
          customerDetails: null,
        })
      );

      await goToURL(
        URLS.loginPinFormUrl,
        {
          email: values.email,
          target: LOGIN_TARGET,
          origin: window.top!.location.href,
          redirect:
            window.top!.location.origin +
            window.top!.location.pathname +
            "?redirect=" +
            (redirect ?? DEFAULT_REDIRECT),
        },
        true
      );
    },
    [redirect, dispatch]
  );

  const onRegister = useCallback(
    (evt) => {
      evt.preventDefault();
      trackRegister();

      dispatch(
        SetCustomerAction({
          customerType: "NEW",
          customerDetails: null,
        })
      );

      history.push(redirect ?? ACCOUNT_DETAILS_PATH);
    },
    [dispatch, history, redirect]
  );

  const checkoutAsGuest = useCallback(() => {
    dispatch(
      SetCustomerAction({
        customerType: "GUEST",
        customerDetails: null,
      })
    );
    history.push(redirect ?? ACCOUNT_DETAILS_PATH);
  }, [history, dispatch, redirect]);

  const onCheckoutAsGuest = useCallback(() => {
    trackGuestCheckout();
    if (isSubscriptionProduct) {
      setIsGuestModalOpened(true);
      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.loginOptions.guestShowModal,
        metadata: {
          productName: product?.name,
          productSku: product?.packs[0].sku,
          packSize: product?.packs[0].itemsPerPack,
        },
      });
    } else {
      checkoutAsGuest();
    }
  }, [isSubscriptionProduct, checkoutAsGuest]);

  const onSubscriptionModalAccept = useCallback(() => {
    product && dispatch(SetProductAction(changeProductToOneTimeOrder(product)));
    history.replace(redirect ?? ACCOUNT_DETAILS_PATH);
  }, [product, dispatch, history, redirect]);

  const onSubscriptionModalReject = useCallback(() => {
    history.replace(PRODUCT_SELECTION_PATH);
  }, [history]);

  const onGuestModalAccept = useCallback(() => {
    product && dispatch(SetProductAction(changeProductToOneTimeOrder(product)));
    checkoutAsGuest();
    analytics.trackEvent({
      flow: "ed",
      event: eventsBuilder.loginOptions.guestRemoveSub,
      metadata: {
        productName: product?.name,
        productSku: product?.packs[0].sku,
        packSize: product?.packs[0].itemsPerPack,
      },
    });
  }, [product, dispatch, checkoutAsGuest]);

  const onGuestModalReject = useCallback(() => {
    analytics.trackEvent({
      flow: "ed",
      event: eventsBuilder.loginOptions.guestBackToCheckout,
      metadata: {
        productName: product?.name,
        productSku: product?.packs[0].sku,
        packSize: product?.packs[0].itemsPerPack,
      },
    });
    setIsGuestModalOpened(false);
  }, []);

  const content = hasSubscriptionsFetchError ? (
    <>
      <Spacing spacing={4} />
      <Alert
        message={"Error when fetching subscriptions"}
        type={"error"}
        spacingAfter={6}
        onClose={fetchSubscriptions}
        closeLabel={"Retry"}
      />
    </>
  ) : shouldShowLoader ? (
    <Box display={"flex"} justifyContent={"center"} p={4}>
      <CircularProgress />
      <AppModal
        isOpen={isSubscriptionModalOpened}
        title={"Looks like you already have a subscription"}
        onSuccess={onSubscriptionModalAccept}
        onBack={onSubscriptionModalReject}
      >
        <Typography align={"center"} spacingAfter={1} color={"inherit"}>
          You can only have one active subscription on your account at a time.
          If you would like to continue, we will change your order to a one-time
          purchase and you will be charged a standard price. Would you like to
          continue?
        </Typography>
      </AppModal>
    </Box>
  ) : (
    <Box my={0}>
      <Form
        onSubmit={onFormSubmit}
        fullWidth
        manualReset
        initialValues={initialValues}
      >
        <Typography className={classes.title} variant={"h2"} spacingAfter={0}>
          Complete your checkout
        </Typography>
        <Typography
          className={classes.description}
          variant={"body2"}
          spacingAfter={3}
        >
          If you already have a Well account, enter your email address to sign
          in.
        </Typography>

        <Typography
          className={classes.subTitle}
          variant={"h5"}
          spacingAfter={1}
        >
          Your email
        </Typography>

        <Grid container>
          <Grid item className={classes.emailInput}>
            <InputField
              spacingAfter={1}
              name={"email"}
              email
              label={"Email address"}
              required
              validationMessages={{ required: "Enter an email address" }}
            />
          </Grid>
          <Grid>
            <Button
              data-testid={"CheckoutOptionsPage/login"}
              color={"primary"}
              variant={"contained"}
              fullWidth
              endIcon={<ChevronRight />}
              type={"submit"}
              onClick={trackSignIn}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>

        <Box mt={1}>
          <Typography
            component={"span"}
            variant={"body2"}
            className={classes.description}
            style={{ fontWeight: 700, letterSpacing: "0.5px" }}
          >
            Don’t have an account?{" "}
            <Typography
              data-testid={"CheckoutOptionsPage/register"}
              component={"span"}
              className={classes.link}
              style={{ marginLeft: "8px" }}
              onClick={onRegister}
            >
              Register now
            </Typography>
          </Typography>
        </Box>

        <Divider spacingBefore={4} spacingAfter={4} />

        <Typography
          className={classes.description}
          variant={"body2"}
          spacingAfter={1}
        >
          Don’t want to register?
        </Typography>

        <Box style={{ width: "50%" }} mb={5}>
          <Button
            data-testid={"CheckoutOptionsPage/guest"}
            onClick={onCheckoutAsGuest}
            fullWidth
            variant={"contained"}
            size={"large"}
            type={"button"}
          >
            <Typography style={{ color: wellColors.zen[500] }}>
              Checkout as guest
            </Typography>
          </Button>
        </Box>

        <Typography
          component={"span"}
          variant={"body2"}
          className={classes.description}
          style={{ fontWeight: 600, fontSize: "14px" }}
        >
          For delivery information and terms of purchase,{" "}
          <Link
            to={TERMS_AND_CONDITIONS_PATH}
            target={"_blank"}
            data-testid={"CheckoutOptionsPage/register"}
            className={classes.link}
            style={{ fontSize: "14px" }}
          >
            please review our terms and conditions.
          </Link>
        </Typography>
      </Form>
      <AppModal
        isOpen={isGuestModalOpened}
        title={"Would you like to continue as a guest?"}
        onSuccess={onGuestModalAccept}
        onBack={onGuestModalReject}
      >
        <Typography align={"center"} spacingAfter={1} color={"inherit"}>
          If you’ve selected our monthly subscription you’ll need to create an
          account. If you’d like to continue checking out as a guest, we will
          change your order to a one-time purchase and you will be charged a
          standard price.
        </Typography>
      </AppModal>
    </Box>
  );

  useEffect(() => {
    if (/account.well.co.uk/i.test(document.referrer)) {
      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.loginOptions.signInComplete,
      });
    }
  }, []);

  return (
    <GeneralLayout>
      <Stepper
        classes={{ container: classes.stepper }}
        steps={ALL_STEPS}
        ignoreCurrentStep
        currentStep={StepperSteps.PERSONAL_DETAILS}
      />
      <OrderBasketWrapper>
        <Container maxWidth={"xs"} disableGutters>
          {content}
        </Container>
      </OrderBasketWrapper>
    </GeneralLayout>
  );
};
