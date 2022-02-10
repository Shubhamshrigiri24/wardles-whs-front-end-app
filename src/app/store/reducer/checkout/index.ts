import { handleActions } from "redux-actions";
import { AnyAction, combineReducers } from "redux";
import {
  CustomerDetails,
  AddCustomerDetailsAction,
  FetchBraintreeTokenResponseAction,
  FetchAddressFromPostcodeActionResponse,
  DeliveryDetails,
  AddDeliveryDetailsAction,
} from "app/store/reducer/checkout/types";
import {
  ADD_CUSTOMER_DETAILS,
  ADD_DELIVERY_DETAILS,
  FETCH_ADDRESS_FROM_POSTCODE_FAILURE,
  FETCH_ADDRESS_FROM_POSTCODE_RESPONSE,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  emptyDeliveryDetails,
} from "app/store/reducer/checkout/constants";

import { PostcodeLookupAddress } from "../shared";

const defaultCustomerDetails: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  postcode: "",
  line1: "",
  line2: "",
  city: "",
  phone: "",
  surgeryName: "",
  surgeryAddress: "",
  allowMarketing: false,
};

const customerDetails = handleActions(
  {
    [ADD_CUSTOMER_DETAILS]: (_state: CustomerDetails, action: AnyAction) => {
      const a = action as AddCustomerDetailsAction;
      return a.payload.customerDetails;
    },
  },
  defaultCustomerDetails
);

const deliveryDetails = handleActions(
  {
    [ADD_DELIVERY_DETAILS]: (
      _state: DeliveryDetails,
      action: AddDeliveryDetailsAction
    ) => {
      return action.payload.deliveryDetails;
    },
  },
  emptyDeliveryDetails
);

const braintreeToken = handleActions(
  {
    [ADD_CUSTOMER_DETAILS]: () => "",
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => "",
    [FETCH_BRAINTREE_TOKEN_RESPONSE]: (_state: string, action: AnyAction) => {
      const a = action as FetchBraintreeTokenResponseAction;
      return a.payload.token;
    },
  },
  ""
);

const paymentErrorMessage = handleActions(
  {
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => "",
  },
  ""
);

const confirmedPayment = handleActions(
  {
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => false,
    [ADD_CUSTOMER_DETAILS]: () => false,
  },
  false
);

const postCodeLookUpAddresses = handleActions(
  {
    [FETCH_ADDRESS_FROM_POSTCODE_RESPONSE]: (
      _state: PostcodeLookupAddress[],
      action: AnyAction
    ) => {
      const a = action as FetchAddressFromPostcodeActionResponse;
      return a.payload.addresses;
    },
    [FETCH_ADDRESS_FROM_POSTCODE_FAILURE]: () => [],
  },
  []
);

const reducer = combineReducers({
  customerDetails,
  confirmedPayment,
  braintreeToken,
  paymentErrorMessage,
  postCodeLookUpAddresses,
  deliveryDetails,
});

export default reducer;
