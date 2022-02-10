import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Typography, Alert } from "@welldigital/components";
import { Loader } from "../../components";
import { ALL_STEPS, Stepper, StepperSteps } from "components/Stepper";
import {
  useAuthentication,
  AUTHENTICATED_STATE,
} from "@welldigital/ui-common/Authentication";
import { REGISTER_PATH_PATH } from "constants/paths";
import { ONLINE_SERVICES } from "constants/account";
import AccountsAPI from "utils/api/AccountsAPI";
import { RootState } from "app/store/types";
import { TAccount } from "app/store/reducer/account/types";
import { OrderCustomerDetails } from "app/store/reducer/order/types";
import { CUSTOMER_TYPES } from "app/store/reducer/order/constants";
import { Scenarios } from "pages/OrderShippingDetails/types";
import { useStyles } from "pages/OrderShippingDetails/styles";
import {
  getInitialFormValues,
  renderPageTitle,
} from "pages/OrderShippingDetails/helpers";
import { useRegisterAccount } from "pages/OrderShippingDetails/hooks";
import OrderDetailsForm from "./OrderDetailsForm";
import RegistrationForm from "./RegistrationForm";

import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import OrderBasketWrapper from "app/layouts/OrderBasketWrapper";

interface Props {
  hasBasket?: boolean;
}

export const OrderShippingDetails: React.FC<Props> = ({
  hasBasket = false,
}) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isBusy] = useState(false);
  const [onlineServicesUser, setOnlineServicesUser] = useState(
    {} as Partial<OrderCustomerDetails>
  );
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [shouldSuppressDeliveryInfo, setShouldSuppressDeliveryInfo] =
    useState(true);
  // TODO: Remove this console log and pass "shouldSuppressDeliveryInfo" to OrderBasketWrapper
  console.log({ msg: "OrderShippingDetails > ", shouldSuppressDeliveryInfo });

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles({ pageContainer: { padding: "50px 0" } });
  const { authenticatedState, email, availableLinks } = useAuthentication();
  const registerAccount = useRegisterAccount();

  const product = useSelector((state: RootState) => state.order.product);
  const customer = useSelector((state: RootState) => state.order.customer);

  // ==============================================================================

  const isSubscription = !!product?.subscription;
  const customerType = customer?.customerType;
  const customerDetails = customer?.customerDetails;

  const isAuthenticated = authenticatedState === AUTHENTICATED_STATE.YES;
  const hasOnlineServiceAccount = !!availableLinks.find(
    (link) => link.id === ONLINE_SERVICES
  );
  const hasRequestedOnlineServiceAccount =
    customerType === CUSTOMER_TYPES.PENDING && !hasOnlineServiceAccount;

  // User entered existing email and has existing online services account
  const isAuthenticatedAndHasAccount =
    isAuthenticated && hasOnlineServiceAccount;

  // User entered existing email and registers to online services (Register occurs when submitting the form)
  const isAuthenticatedAndRequestsAccount =
    isAuthenticated && !hasOnlineServiceAccount;

  // User wishes to create new account (will redirect to PIN page)
  const isNotAuthenticatedAndRequestsAccount =
    !isAuthenticated && customerType === CUSTOMER_TYPES.NEW;

  // User is redirected from PIN confimration page, during account creation flow (Register occurs when landing on page)
  const isAuthenticatedAndHasRequestedAccount =
    isAuthenticated && hasRequestedOnlineServiceAccount;

  // User is checking out as guest
  const isNotAuthenticatedAndDoesNotRequestAccount =
    !isAuthenticated && customerType === CUSTOMER_TYPES.GUEST;

  // User only watns to register account, without checking out
  const isRegisteringOutsideOfCheckoutFlow = pathname === REGISTER_PATH_PATH;

  const SCENARIOS: Scenarios = {
    isAuthenticatedAndHasAccount,
    isAuthenticatedAndRequestsAccount,
    isNotAuthenticatedAndRequestsAccount,
    isAuthenticatedAndHasRequestedAccount,
    isNotAuthenticatedAndDoesNotRequestAccount,
  };

  // ==============================================================================

  const initialValues = getInitialFormValues({
    existingUserData: {
      ...onlineServicesUser,
      dob:
        // TODO: Remove this check if BE sends null | "" | undefined for unexisting dob
        onlineServicesUser.dob === "0001-01-01T00:00:00Z"
          ? ""
          : onlineServicesUser.dob,
    },
    email,
    isAuthenticatedAndRequestsAccount,
    isAuthenticatedAndHasAccount,
    isNotAuthenticatedAndRequestsAccount,
    isNotAuthenticatedAndDoesNotRequestAccount,
    isRegisteringOutsideOfCheckoutFlow,
    isSubscription,
  });

  const handleAlertClose = useCallback(() => setFormError(null), []);
  const handleFormError = useCallback((message: string) => {
    setFormError(message);
    pageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const formProps = {
    handleFormError,
    initialValues,
    isAuthenticated,
    isBusy,
    onlineServicesUser,
    scenarios: SCENARIOS,
    setIsPageLoading,
  };

  const fetchUserData = useCallback(async () => {
    try {
      const response = await AccountsAPI.getAccount();
      const data: TAccount = response.data;
      setOnlineServicesUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        addressLine1: data.addressline1,
        addressLine2: data.addressline2,
        postcode: data.postcode,
        city: data.city,
        gpDetails: data.gpDetails,
        dob: data.dob,
        agreeMarketing: data.agreeMarketing,
      });
    } catch (err) {
      handleFormError(
        "An error occured when trying to retrieve your account details."
      );
    }
  }, [handleFormError]);

  useEffect(() => {
    if (isAuthenticatedAndHasRequestedAccount && !isRegistrationComplete) {
      registerAccount({
        values: { ...customerDetails },
        setIsPageLoading,
        handleFormError,
        redirect: isRegisteringOutsideOfCheckoutFlow
          ? "/account/orders"
          : "/order/ed/payment",
        isCheckoutFlow: !isRegisteringOutsideOfCheckoutFlow,
      });
      setIsRegistrationComplete(true);
    } else if (isAuthenticated && isRegisteringOutsideOfCheckoutFlow) {
      history.push("/account/orders");
    }
  }, [
    isAuthenticatedAndHasRequestedAccount,
    isRegisteringOutsideOfCheckoutFlow,
    customerDetails,
    registerAccount,
    isRegistrationComplete,
    handleFormError,
    isAuthenticated,
    history,
  ]);

  useEffect(() => {
    if (isAuthenticatedAndHasAccount) {
      fetchUserData();
    }
  }, [isAuthenticatedAndHasAccount, fetchUserData]);

  useEffect(() => {
    if (!hasRequestedOnlineServiceAccount) {
      setIsPageLoading(false);
    }
  }, [hasRequestedOnlineServiceAccount]);

  const content = isPageLoading ? (
    <div className={classes.overlay}>
      <Loader />
    </div>
  ) : (
    <div ref={pageContainerRef} className={classes.pageContainer}>
      <div
        className={classes.pageContent}
        style={isRegisteringOutsideOfCheckoutFlow ? { padding: "50px 0" } : {}}
      >
        {formError && (
          <Alert
            type={"error"}
            message={formError}
            onClose={handleAlertClose}
            className={classes.alert}
          />
        )}
        <Typography variant={"h2"} spacingAfter={4} className={classes.title}>
          {renderPageTitle(SCENARIOS, shouldSuppressDeliveryInfo)}
        </Typography>
        {isAuthenticatedAndRequestsAccount && (
          <>
            <Typography className={classes.paragraph} spacingAfter={3}>
              It looks like you already have a Well account. To continue
              checking out, you will need to register for our subscriptions
              account by entering your details below.
            </Typography>
            <Typography className={classes.paragraph} spacingAfter={3}>
              Once your account is created, we will add it to your dashboard,
              meaning next time you sign in you can manage your subscriptions
              easily.
            </Typography>
          </>
        )}

        {isRegisteringOutsideOfCheckoutFlow ? (
          // User will only create account, without checkout
          <RegistrationForm {...formProps} />
        ) : (
          // User is registering during checkout flow
          <OrderDetailsForm
            {...formProps}
            shouldSkipAccountDetailsStep={isAuthenticatedAndHasAccount}
            setShouldSuppressDeliveryInfo={setShouldSuppressDeliveryInfo}
          />
        )}
      </div>
    </div>
  );
  return (
    <GeneralLayout>
      {hasBasket ? (
        <>
          <Stepper
            classes={{ container: classes.stepper }}
            steps={ALL_STEPS}
            currentStep={
              shouldSuppressDeliveryInfo
                ? StepperSteps.PERSONAL_DETAILS
                : StepperSteps.DELIVERY_DETAILS
            }
          />
          <OrderBasketWrapper
            shouldSuppressDeliveryInfo={shouldSuppressDeliveryInfo}
          >
            {content}
          </OrderBasketWrapper>
        </>
      ) : (
        content
      )}
    </GeneralLayout>
  );
};

export default OrderShippingDetails;
