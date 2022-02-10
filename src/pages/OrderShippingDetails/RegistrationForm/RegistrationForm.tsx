import React, { useCallback } from "react";
import { omit } from "lodash";
import { Form, Button } from "@welldigital/components";
import { FormValues, Scenarios } from "pages/OrderShippingDetails/types";
import FormFields from "pages/OrderShippingDetails/FormFields";
import { useStyles } from "pages/OrderShippingDetails/styles";
import {
  getCustomerDetailsFromValues,
  redirectToPINConfirmationPage,
} from "pages/OrderShippingDetails/helpers";
import { OrderCustomerDetails } from "app/store/reducer/order/types";
import { CUSTOMER_TYPES } from "app/store/reducer/order/constants";
import { useRegisterAccount } from "pages/OrderShippingDetails/hooks";
import { useCustomer, useSetCustomer, useProduct } from "app/store/hooks";

export type RegistrationFormProps = {
  initialValues: Partial<FormValues>;
  scenarios: Scenarios;
  onlineServicesUser: Partial<OrderCustomerDetails>;
  handleFormError: (message: string) => void;
  setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isBusy: boolean;
  isAuthenticated: boolean;
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialValues,
  scenarios,
  handleFormError,
  setIsPageLoading,
  isBusy,
  isAuthenticated,
}) => {
  const product = useProduct();
  const customer = useCustomer();
  const setCustomer = useSetCustomer();
  const classes = useStyles({ pageContainer: { padding: "50px 0" } });
  const registerAccount = useRegisterAccount();

  const isSubscription = !!product?.subscription;
  const customerType = customer?.customerType;

  const { isNotAuthenticatedAndDoesNotRequestAccount } = scenarios;

  const handleSubmit = useCallback(
    (values: typeof initialValues) => {
      if (isAuthenticated) {
        setCustomer({
          customerType,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        registerAccount({
          values: { ...omit(values, ["agreeTerms"]) },
          setIsPageLoading,
          handleFormError,
          redirect: "/account/orders",
          isCheckoutFlow: false,
        });
      } else {
        setCustomer({
          customerType: CUSTOMER_TYPES.PENDING,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        redirectToPINConfirmationPage(values.email!);
      }
    },
    [
      customerType,
      initialValues,
      isAuthenticated,
      setCustomer,
      registerAccount,
      handleFormError,
      setIsPageLoading,
    ]
  );

  return (
    <Form
      fullWidth
      manualReset
      initialValues={initialValues}
      onSubmit={handleSubmit}
      spacingAfter={3}
    >
      <FormFields
        formValues={initialValues}
        handleFormError={handleFormError}
        isBusy={isBusy}
        shouldRenderAddress
        isSubscription={isSubscription}
        isAuthenticated={isAuthenticated}
        isGuest={isNotAuthenticatedAndDoesNotRequestAccount}
      />
      <div className={classes.flexContainer}>
        <Button fullWidth size={"large"} type={"submit"} color={"primary"}>
          Create new account
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
