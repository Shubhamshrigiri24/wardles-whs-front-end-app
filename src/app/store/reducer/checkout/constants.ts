import {
  CustomerDetails,
  DeliveryDetails,
} from "app/store/reducer/checkout/types";

export const ADD_CUSTOMER_DETAILS = "CUSTOMER/ADD_CUSTOMER_DETAILS";
export const ADD_DELIVERY_DETAILS = "CUSTOMER/ADD_DELIVERY_DETAILS";

export const FETCH_BRAINTREE_TOKEN = "PAYMENT/FETCH_BRAINTREE_TOKEN";
export const FETCH_BRAINTREE_TOKEN_REQUEST =
  "PAYMENT/FETCH_BRAINTREE_TOKEN_REQUEST";
export const FETCH_BRAINTREE_TOKEN_RESPONSE =
  "PAYMENT/FETCH_BRAINTREE_TOKEN_RESPONSE";
export const FETCH_BRAINTREE_TOKEN_FAILURE =
  "PAYMENT/FETCH_BRAINTREE_TOKEN_FAILURE";

export const FETCH_ADDRESS_FROM_POSTCODE =
  "ADDRESS/FETCH_ADDRESS_FROM_POSTCODE";
export const FETCH_ADDRESS_FROM_POSTCODE_REQUEST =
  "ADDRESS/FETCH_ADDRESS_FROM_POSTCODE_REQUEST";
export const FETCH_ADDRESS_FROM_POSTCODE_RESPONSE =
  "ADDRESS/FETCH_ADDRESS_FROM_POSTCODE_RESPONSE";
export const FETCH_ADDRESS_FROM_POSTCODE_FAILURE =
  "ADDRESS/FETCH_ADDRESS_FROM_POSTCODE_FAILURE";

export const emptyCustomerDetails: CustomerDetails = {
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
  email: "",
  phone: "",
  surgeryName: "",
  surgeryAddress: "",
  allowMarketing: false,
};

export const emptyDeliveryDetails: DeliveryDetails = {
  title: "",
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
};
