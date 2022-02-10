import { pick } from "lodash";
import { InputProps } from "@welldigital/components";
import { OrderCustomerDetails } from "app/store/reducer/order/types";
import {
  PHONE_NUMBER_PATERN,
  POSTCODE_PATTERN,
  NAME_PATERN,
} from "utils/regex";
import { FormValues, Scenarios } from "pages/OrderShippingDetails/types";
import { goToURL } from "@welldigital/ui-common/Utils/navigation";
import { LOGIN_TARGET } from "constants/login";
import { URLS } from "@welldigital/ui-common/Authentication/envDerivedConstants";

const MAX_NAME_LENGTH = 50;
const MAX_ADDRESS_LENGTH = 100;

// TODO: Refactor logic with const enum UserCheckoutFlowScenario {}

export const getInitialFormValues = ({
  isAuthenticatedAndRequestsAccount,
  isAuthenticatedAndHasAccount,
  isNotAuthenticatedAndRequestsAccount,
  isNotAuthenticatedAndDoesNotRequestAccount,
  isRegisteringOutsideOfCheckoutFlow,
  existingUserData,
  email,
  isSubscription,
}: {
  isAuthenticatedAndRequestsAccount: boolean;
  isAuthenticatedAndHasAccount: boolean;
  isNotAuthenticatedAndRequestsAccount: boolean;
  isNotAuthenticatedAndDoesNotRequestAccount: boolean;
  isRegisteringOutsideOfCheckoutFlow: boolean;
  existingUserData: Partial<FormValues>;
  email: string;
  isSubscription: boolean;
}): Partial<FormValues> => {
  const personalInfoFields: Partial<FormValues> = {
    firstName: "",
    lastName: "",
    phone: "",
    email,
  };

  const addressFields: Partial<FormValues> = {
    postcode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
  };

  const subscriptionSpecificFields: Partial<FormValues> = isSubscription
    ? {
        dob: "",
        gpDetails: "",
      }
    : {};

  const termsAndMarketingPreferences: Partial<FormValues> = {
    agreeTerms: false,
    agreeMarketing: false,
  };

  if (isAuthenticatedAndRequestsAccount) {
    return {
      ...personalInfoFields,
      ...addressFields,
      ...subscriptionSpecificFields,
      ...termsAndMarketingPreferences,
    };
  }

  if (isAuthenticatedAndHasAccount) {
    const initialValues = {
      ...addressFields,
      ...subscriptionSpecificFields,
      ...termsAndMarketingPreferences,
    };
    return pick(existingUserData, Object.keys(initialValues));
  }

  if (isNotAuthenticatedAndRequestsAccount) {
    return {
      ...personalInfoFields,
      ...addressFields,
      ...subscriptionSpecificFields,
      ...termsAndMarketingPreferences,
    };
  }

  if (isNotAuthenticatedAndDoesNotRequestAccount) {
    return {
      ...personalInfoFields,
      ...addressFields,
      ...termsAndMarketingPreferences,
    };
  }

  if (isRegisteringOutsideOfCheckoutFlow) {
    return {
      ...personalInfoFields,
      ...addressFields,
      ...termsAndMarketingPreferences,
    };
  }

  return {};
};

export const validatePhone = (value: InputProps["value"]) => {
  if (!value || !PHONE_NUMBER_PATERN.test(value)) {
    return "Enter a valid telephone number";
  }
  return true;
};

export const validatePostcode = (value: InputProps["value"]) => {
  if (!value || !POSTCODE_PATTERN.test(value)) {
    return "Enter a valid postcode";
  }
  return true;
};

export const validateName = (value: InputProps["value"]) => {
  if (!value || !NAME_PATERN.test(value)) {
    return "Name must only include letters";
  }

  if (value.length > MAX_NAME_LENGTH) {
    return `Name cannot be more than ${MAX_NAME_LENGTH} characters long`;
  }

  return true;
};

export const validateRequiredAddress = (value: InputProps["value"]) => {
  if (!value) {
    return "Enter the first line of your delivery address";
  }

  if (value.length > MAX_ADDRESS_LENGTH) {
    return `Field cannot exceed ${MAX_ADDRESS_LENGTH} characters`;
  }

  return true;
};

export const validateMaxLength = (value: InputProps["value"]) => {
  if (value.length > MAX_ADDRESS_LENGTH) {
    return `Field cannot exceed ${MAX_ADDRESS_LENGTH} characters`;
  }
  return true;
};

export const getCustomerDetailsFromValues = (
  values: Partial<FormValues>
): OrderCustomerDetails => {
  return {
    firstName: values.firstName ?? "",
    lastName: values.lastName ?? "",
    phone: values.phone ?? "",
    email: values.email ?? "",
    postcode: values.postcode ?? "",
    addressLine1: values.addressLine1 ?? "",
    addressLine2: values.addressLine2 ?? "",
    city: values.city ?? "",
    dob: values.dob,
    gpDetails: values.gpDetails ?? "",
    agreeMarketing: values.agreeMarketing ?? false,
  };
};

export const renderPageTitle = (
  scenarios: Scenarios,
  isAccountPage: boolean
): string => {
  const {
    isAuthenticatedAndRequestsAccount,
    isAuthenticatedAndHasAccount,
    isNotAuthenticatedAndRequestsAccount,
    isNotAuthenticatedAndDoesNotRequestAccount,
  } = scenarios;

  if (isAuthenticatedAndRequestsAccount) {
    return "Confirm your details";
  }

  if (isAuthenticatedAndHasAccount || !isAccountPage) {
    return "Delivery details";
  }

  if (isNotAuthenticatedAndRequestsAccount) {
    return "Account details";
  }

  if (isNotAuthenticatedAndDoesNotRequestAccount) {
    return "Personal details";
  }
  return "";
};

export const redirectToPINConfirmationPage = async (email: string) => {
  await goToURL(
    URLS.loginPinFormUrl,
    {
      email,
      target: LOGIN_TARGET,
      origin: window.top!.location.href,
      redirect: window.top!.location.href,
    },
    false
  );
};
