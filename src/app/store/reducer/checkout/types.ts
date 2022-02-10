import { RSAA } from "redux-api-middleware";
import { PostcodeLookupAddress } from "../shared";

export interface State {
  customerDetails: CustomerDetails;
  confirmedPayment: boolean;
  braintreeToken: string;
  paymentErrorMessage: string;
  postCodeLookUpAddresses: PostcodeLookupAddress[];
  deliveryDetails: DeliveryDetails;
}

export interface CustomerDetails {
  title?: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
  surgeryName?: string;
  surgeryAddress?: string;
  allowMarketing?: boolean;
}

export interface AddCustomerDetailsAction {
  type: string;
  payload: {
    customerDetails: CustomerDetails;
  };
}

export interface DeliveryDetails {
  title?: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

export interface AddDeliveryDetailsAction {
  type: string;
  payload: {
    deliveryDetails: DeliveryDetails;
  };
}

export interface FetchBraintreeTokenAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    types: [string, string, string];
  };
}

export interface FetchBraintreeTokenResponseAction {
  type: string;
  payload: {
    token: string;
  };
}

export interface PaymentFailureAction {
  type: string;
  payload: {
    response: {
      message: string | null;
    } | null;
  };
}

export interface FetchAddressFromPostcodeActionResponse {
  type: string;
  payload: {
    addresses: PostcodeLookupAddress[];
  };
}
