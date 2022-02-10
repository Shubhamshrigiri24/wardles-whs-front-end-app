import { OrderCustomerDetails } from "app/store/reducer/order/types";

export type AddressValues = {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
};

export type FormValues = OrderCustomerDetails & {
  agreeTerms: boolean;
};

export type PostcodeAddress = {
  city: string;
  country: string;
  postcode: string;
  line1: string;
  line2: string;
};

export type Scenarios = {
  isAuthenticatedAndHasAccount: boolean;
  isAuthenticatedAndRequestsAccount: boolean;
  isNotAuthenticatedAndRequestsAccount: boolean;
  isAuthenticatedAndHasRequestedAccount: boolean;
  isNotAuthenticatedAndDoesNotRequestAccount: boolean;
};

export enum FormStep {
  ACCOUNT_DETAILS = "ACCOUTN_DETAILS",
  DELIVERY_DETAILS = "DELIVERY_DETAILS",
}
