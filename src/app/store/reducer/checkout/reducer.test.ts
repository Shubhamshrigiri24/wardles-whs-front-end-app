import reducer from ".";
import { makeCustomerDetails, makeDeliveryDetails } from "../mock";
import {
  AddCustomerDetailsAction,
  FetchBraintreeTokenResponseAction,
  State,
  AddDeliveryDetailsAction,
} from "app/store/reducer/checkout/types";
import {
  ADD_CUSTOMER_DETAILS,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  emptyDeliveryDetails,
  emptyCustomerDetails,
} from "app/store/reducer/checkout/constants";
import { addCustomerDetails, addDeliveryDetails } from "./actions";
import { getConfirmedPayment, getBraintreeToken } from "./selectors";

describe("Reducer", () => {
  describe("CustomerDetails", () => {
    it("should be initially set to all empty strings", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.customerDetails).toEqual(emptyCustomerDetails);
    });

    it("should set customer details", () => {
      const newCustomerDetails = makeCustomerDetails();
      const action: AddCustomerDetailsAction =
        addCustomerDetails(newCustomerDetails);
      const state = reducer(undefined, action);
      expect(state.customerDetails).toEqual(newCustomerDetails);
    });
  });

  describe("braintreeToken", () => {
    it("should be initially set to empty strings", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.braintreeToken).toEqual("");
    });

    it("should set token on FETCH_BRAINTREE_TOKEN_RESPONSE", () => {
      const newToken = "token";
      const action: FetchBraintreeTokenResponseAction = {
        type: FETCH_BRAINTREE_TOKEN_RESPONSE,
        payload: {
          token: newToken,
        },
      };
      const state = reducer(undefined, action);
      expect(state.braintreeToken).toEqual(newToken);
    });

    [FETCH_BRAINTREE_TOKEN_REQUEST, ADD_CUSTOMER_DETAILS].forEach((type) => {
      it(`should be clear the token on ${type}`, () => {
        const state = reducer({ braintreeToken: "a-token" } as State, {
          type,
          // this payload is needed to make other reducers handling the action succeed
          payload: { customerDetails: {} },
        });
        expect(getBraintreeToken(state)).toEqual("");
      });
    });

    it("should set clear the FETCH_BRAINTREE_TOKEN_RESPONSE", () => {
      const newToken = "token";
      const action: FetchBraintreeTokenResponseAction = {
        type: FETCH_BRAINTREE_TOKEN_RESPONSE,
        payload: {
          token: newToken,
        },
      };
      const state = reducer(undefined, action);
      expect(state.braintreeToken).toEqual(newToken);
    });
  });

  describe("paymentErrorMessage", () => {
    it("should be initially set to empty strings", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.paymentErrorMessage).toEqual("");
    });
  });

  describe("confirmedPayment", () => {
    it("should be initially false", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(getConfirmedPayment(state)).toBe(false);
    });

    [FETCH_BRAINTREE_TOKEN_REQUEST, ADD_CUSTOMER_DETAILS].forEach((type) => {
      it(`should be set to false on ${type}`, () => {
        const state = reducer({ confirmedPayment: true } as State, {
          type,
          // this payload is needed to make other reducers handling the action succeed
          payload: { customerDetails: {} },
        });
        expect(getConfirmedPayment(state)).toBe(false);
      });
    });
  });

  describe("DeliveryDetails", () => {
    it("should be initially set to all empty strings", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.deliveryDetails).toEqual(emptyDeliveryDetails);
    });

    it("should set delivery details", () => {
      const newDeliveryDetails = makeDeliveryDetails();
      const action: AddDeliveryDetailsAction =
        addDeliveryDetails(newDeliveryDetails);
      const state = reducer(undefined, action);
      expect(state.deliveryDetails).toEqual(newDeliveryDetails);
    });
  });
});
