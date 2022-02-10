import { useHistory } from "react-router-dom";
import { FormValues } from "pages/OrderShippingDetails/types";
import { TAccount } from "app/store/reducer/account/types";
import AccountsAPI from "utils/api/AccountsAPI";
import { useAuthentication } from "@welldigital/ui-common/Authentication";
import { analytics } from "@welldigital/ui-common/Analytics";
import { getCustomerDetailsFromValues } from "pages/OrderShippingDetails/helpers";
import events from "utils/events";
import { useSetCustomer } from "app/store/hooks";
import { CUSTOMER_TYPES } from "app/store/reducer/order/constants";

export const useRegisterAccount = () => {
  const history = useHistory();
  const setCustomer = useSetCustomer();
  const { performAuthentication } = useAuthentication();

  return ({
    values,
    handleFormError,
    setIsPageLoading,
    redirect,
    isCheckoutFlow,
  }: {
    values: Partial<FormValues>;
    handleFormError: (message: string) => void;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    redirect: string;
    isCheckoutFlow: boolean;
  }) => {
    return (async () => {
      setIsPageLoading(true);
      const body: Partial<TAccount> = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        postcode: values.postcode,
        addressline1: values.addressLine1,
        addressline2: values.addressLine2,
        city: values.city,
        ...(!!values.dob ? { dob: values.dob } : {}),
        ...(!!values.gpDetails ? { gpDetails: values.gpDetails } : {}),
        agreeMarketing: values.agreeMarketing,
      };
      try {
        await AccountsAPI.createAccount(body);
        await performAuthentication(true);
        analytics.trackEvent({
          flow: "services",
          event: events.registration.customer,
          metadata: {
            checkout: isCheckoutFlow ? "YES" : "NO",
          },
        });
        setCustomer({
          customerType: CUSTOMER_TYPES.EXISTING,
          customerDetails: getCustomerDetailsFromValues(values),
        });
        history.push(redirect);
      } catch (err) {
        handleFormError(
          "An error occured when creating your online services account. Please try again"
        );
        setIsPageLoading(false);
      }
    })();
  };
};
