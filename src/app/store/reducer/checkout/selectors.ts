import { State, CustomerDetails, DeliveryDetails } from "./types";
import { PostcodeLookupAddress } from "../shared";

export function getCustomerDetails(state: State): CustomerDetails {
  return state.customerDetails;
}

export function getBraintreeToken(state: State): string {
  return state.braintreeToken;
}

export function getConfirmedPayment(state: State): boolean {
  return state.confirmedPayment;
}

export function getPaymentErrorMessage(state: State): string {
  return state.paymentErrorMessage;
}

export function getPostCodeLookUpAddresses(
  state: State
): PostcodeLookupAddress[] {
  return state.postCodeLookUpAddresses;
}

export function getDeliveryDetails(state: State): DeliveryDetails {
  return state.deliveryDetails;
}
