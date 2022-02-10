import { RSAA } from "redux-api-middleware";

import { API_ENDPOINT, POSTCODE_ENDPOINT } from "../../config";
import {
  FetchBraintreeTokenAction,
  CustomerDetails,
  AddCustomerDetailsAction,
  DeliveryDetails,
  AddDeliveryDetailsAction,
} from "app/store/reducer/checkout/types";
import {
  ADD_CUSTOMER_DETAILS,
  ADD_DELIVERY_DETAILS,
  FETCH_ADDRESS_FROM_POSTCODE,
  FETCH_ADDRESS_FROM_POSTCODE_FAILURE,
  FETCH_ADDRESS_FROM_POSTCODE_REQUEST,
  FETCH_ADDRESS_FROM_POSTCODE_RESPONSE,
  FETCH_BRAINTREE_TOKEN,
  FETCH_BRAINTREE_TOKEN_FAILURE,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
} from "app/store/reducer/checkout/constants";
import { APICallAction } from "../shared";

export function fetchToken(
  endpoint: string = API_ENDPOINT
): FetchBraintreeTokenAction {
  return {
    type: FETCH_BRAINTREE_TOKEN,
    [RSAA]: {
      endpoint: `${endpoint}/paymenttoken`,
      method: "GET",
      types: [
        FETCH_BRAINTREE_TOKEN_REQUEST,
        FETCH_BRAINTREE_TOKEN_RESPONSE,
        FETCH_BRAINTREE_TOKEN_FAILURE,
      ],
    },
  };
}

export function addCustomerDetails(
  data: CustomerDetails
): AddCustomerDetailsAction {
  return {
    type: ADD_CUSTOMER_DETAILS,
    payload: {
      customerDetails: data,
    },
  };
}

export function fetchPostCodeAddress(
  postcode: string,
  endpoint: string = POSTCODE_ENDPOINT
): APICallAction {
  return {
    type: FETCH_ADDRESS_FROM_POSTCODE,
    [RSAA]: {
      endpoint: `${endpoint}/postcodes/${postcode}/addresses`,
      method: "GET",
      types: [
        FETCH_ADDRESS_FROM_POSTCODE_REQUEST,
        FETCH_ADDRESS_FROM_POSTCODE_RESPONSE,
        FETCH_ADDRESS_FROM_POSTCODE_FAILURE,
      ],
    },
  };
}

export function addDeliveryDetails(
  data: DeliveryDetails
): AddDeliveryDetailsAction {
  return {
    type: ADD_DELIVERY_DETAILS,
    payload: {
      deliveryDetails: data,
    },
  };
}
