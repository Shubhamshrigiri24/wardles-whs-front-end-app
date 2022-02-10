import {
  getCustomerDetails,
  getBraintreeToken,
  getConfirmedPayment,
  getDeliveryDetails,
} from "./selectors";
import { State } from "./types";
import { makeCustomerDetails, makeDeliveryDetails } from "../mock";

describe("Selectors", () => {
  describe("Get customer details", () => {
    it("Returns customer details", () => {
      const customer = makeCustomerDetails();
      const state: State = {
        customerDetails: customer,
      } as State;
      const customerTest = getCustomerDetails(state);
      expect(customerTest).toEqual(customer);
    });
  });
  describe("Get Token", () => {
    it("Returns Token", () => {
      const state: State = {
        braintreeToken: "TOKENXXX123",
      } as State;
      const token = getBraintreeToken(state);
      expect(token).toEqual("TOKENXXX123");
    });
  });
  describe("Get payment confrimed", () => {
    it("Returns false", () => {
      const state: State = {
        confirmedPayment: false,
      } as State;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const confirmed = getConfirmedPayment(state);
      expect(confirmed).toEqual(false);
    });
    it("Returns true", () => {
      const state: State = {
        confirmedPayment: true,
      } as State;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const confirmed = getConfirmedPayment(state);
      expect(confirmed).toEqual(true);
    });
  });
  describe("Get deliveryDetails", () => {
    it("Returns delivery details", () => {
      const deliveryDetails = makeDeliveryDetails();
      const state = {
        deliveryDetails,
      } as State;
      const result = getDeliveryDetails(state);
      expect(result).toEqual(deliveryDetails);
    });
  });
});
