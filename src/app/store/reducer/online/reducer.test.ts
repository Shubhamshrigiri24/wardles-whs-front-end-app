import reducer from ".";
import {
  Ed,
  defaultProduct,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_RESPONSE,
  FetchProductsResponseAction,
  defaultPack,
  SET_CONSULTATION,
  SET_IS_CONSULTATION_VALID_FOR_ORDER,
  State,
  START_TRIPETTO,
  ON_ORDER_RESPONSE,
  ON_ORDER,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  FetchBraintreeTokenResponseAction,
  PaymentFailureAction,
  ON_ORDER_FAILURE,
  ON_ORDER_REQUEST,
  Hana,
  SEND_CONSULTATION_REQUEST,
  SEND_CONSULTATION_FAILURE,
  SEND_CONSULTATION_RESPONSE,
} from "./types";
import { AnyAction } from "redux";
import { makeOnlineQuestions, makeProduct } from "../mock";
import {
  getBraintreeToken,
  getOrderNumber,
  getSuccessfulOrder,
} from "./selectors";
import { GENERIC_ERROR_MESSAGE } from "app/store/config";

describe("Reducer", () => {
  describe("selectedOnlineService", () => {
    it("should be initially set to ed", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.selectedOnlineService).toEqual(Ed);
    });
  });

  describe("selectedProduct", () => {
    it("should be initially set to the default product object", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.selectedProduct).toEqual(defaultProduct);
    });
  });

  describe("Fetch Products", () => {
    it("should return the initial state", () => {
      const initialState: State = {
        products: [defaultProduct],
        selectedPack: defaultPack,
        selectedProduct: defaultProduct,
        selectedOnlineService: Ed,
        productToken: null,
        productTokenValid: true,
        onlineServices: [Ed, Hana],
        fetching: true,
        consultation: {
          token: null,
          responses: [],
          isValidForOrder: false,
        },
        successfulOrder: false,
        braintreeToken: "",
        orderErrorMessage: "",
        orderNumber: "",
      };
      expect(reducer(undefined, { type: "HELLO" })).toEqual(initialState);
    });

    it("should handle FETCH_PRODUCTS_RESPONSE", () => {
      const dummyResponse = [makeProduct()];

      const action: FetchProductsResponseAction = {
        type: FETCH_PRODUCTS_RESPONSE,
        payload: dummyResponse,
      };
      const state = reducer(undefined, action);
      expect(state.products).toEqual(dummyResponse);
    });

    it("should handle FETCH_ProductS_FAILURE", () => {
      const action: AnyAction = {
        type: FETCH_PRODUCTS_FAILURE,
      };
      const state = reducer(undefined, action);
      expect(state.products).toEqual([]);
    });

    it("should handle FETCH_ProductS_REQUEST", () => {
      const action: AnyAction = {
        type: FETCH_PRODUCTS_REQUEST,
      };
      const state = reducer(undefined, action);
      expect(state.products).toEqual([]);
    });
  });

  describe("consultation", () => {
    const questions = makeOnlineQuestions();
    const token = "token";
    const emptyState = {
      consultation: { responses: [], token: null, isValidForOrder: false },
    };
    const stateWithConsultationResponses = {
      consultation: {
        responses: questions,
        token: null,
        isValidForOrder: false,
      },
    };
    const stateWithToken = {
      consultation: { responses: questions, token, isValidForOrder: false },
    };
    const stateReadyForOrder = {
      consultation: {
        responses: [],
        token: null,
        isValidForOrder: true,
      },
    };

    it.each([
      [
        "has correct initial state",
        undefined,
        { type: "" },
        emptyState.consultation,
      ],
      [
        `has correct state after ${SET_CONSULTATION}`,
        undefined,
        {
          type: [SET_CONSULTATION],
          payload: { consultation: questions },
        },
        stateWithConsultationResponses.consultation,
      ],
      [
        `has correct state after ${SET_IS_CONSULTATION_VALID_FOR_ORDER}`,
        undefined,
        {
          type: [SET_IS_CONSULTATION_VALID_FOR_ORDER],
          payload: true,
        },
        stateReadyForOrder.consultation,
      ],
      [
        `clears consultation on ${START_TRIPETTO}`,
        stateWithToken as unknown as State,
        { type: [START_TRIPETTO] },
        emptyState.consultation,
      ],
      [
        `clears token on ${SEND_CONSULTATION_REQUEST}`,
        stateWithToken as unknown as State,
        { type: [SEND_CONSULTATION_REQUEST] },
        stateWithConsultationResponses.consultation,
      ],
      [
        `clears token on ${SEND_CONSULTATION_FAILURE}`,
        stateWithToken as unknown as State,
        { type: [SEND_CONSULTATION_FAILURE] },
        stateWithConsultationResponses.consultation,
      ],
      [
        `sets token on ${SEND_CONSULTATION_RESPONSE}`,
        stateWithConsultationResponses as unknown as State,
        { type: [SEND_CONSULTATION_RESPONSE], payload: token },
        stateWithToken.consultation,
      ],
      [
        // in this case there's been a referral
        `sets token to undefined on ${SEND_CONSULTATION_RESPONSE} without token`,
        stateWithConsultationResponses as unknown as State,
        { type: [SEND_CONSULTATION_RESPONSE] },
        stateWithConsultationResponses.consultation,
      ],
    ])("%s", (_name, initialState, action, expectedResult) => {
      expect(reducer(initialState, action).consultation).toEqual(
        expectedResult
      );
    });
  });

  describe("orderNumber", () => {
    const orderNumber = "order-number";
    it("should be initially set to empty", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.orderNumber).toEqual("");
    });
    it("should be set on order response", () => {
      const state = reducer(undefined, {
        type: [ON_ORDER_RESPONSE],
        payload: { orderNumber },
      });
      expect(state.orderNumber).toEqual(orderNumber);
    });

    [ON_ORDER, FETCH_BRAINTREE_TOKEN_REQUEST].forEach((type) => {
      it(`should clear on ${type}`, () => {
        const state = reducer({ orderNumber: orderNumber } as any, {
          type: [ON_ORDER],
        });
        expect(state.orderNumber).toEqual("");
      });
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

    [FETCH_BRAINTREE_TOKEN_REQUEST, ON_ORDER, START_TRIPETTO].forEach(
      (type) => {
        it(`should be clear the token on ${type}`, () => {
          const state = reducer({ braintreeToken: "a-token" } as State, {
            type,
            payload: { customerDetails: {} },
          });
          expect(getBraintreeToken(state)).toEqual("");
        });
      }
    );

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

  describe("orderErrorMessage", () => {
    it("should be initially set to empty strings", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(state.orderErrorMessage).toEqual("");
    });

    it("should set orderErrorMessage", () => {
      const newErrorMessage = "orderErrorMessage";
      const action: PaymentFailureAction = {
        type: ON_ORDER_FAILURE,
        payload: {
          response: {
            message: newErrorMessage,
          },
        },
      };
      const state = reducer(undefined, action);
      expect(state.orderErrorMessage).toEqual(newErrorMessage);
    });

    it("should get a generic error message if there is no error message in the response", () => {
      const action: PaymentFailureAction = {
        type: ON_ORDER_FAILURE,
        payload: {
          response: null,
        },
      };
      const state = reducer(undefined, action);
      expect(state.orderErrorMessage).toEqual(GENERIC_ERROR_MESSAGE);
    });
  });

  describe("successfulOrder", () => {
    it("should be initially false", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(getSuccessfulOrder(state)).toBe(false);
    });
    it("should be set to true on ON_PAY_RESPONSE", () => {
      const state = reducer(undefined, { type: ON_ORDER_RESPONSE });
      expect(getSuccessfulOrder(state)).toBe(true);
    });
    [
      ON_ORDER_FAILURE,
      ON_ORDER_REQUEST,
      FETCH_BRAINTREE_TOKEN_REQUEST,
      SET_CONSULTATION,
    ].forEach((type) => {
      it(`should be set to false on ${type}`, () => {
        const state = reducer({ successfulOrder: true } as State, {
          type,
          payload: { customerDetails: {} },
        });
        expect(getSuccessfulOrder(state)).toBe(false);
      });
    });
  });

  describe("orderNumber", () => {
    it("should be initially empty", () => {
      const state = reducer(undefined, { type: "NO" });
      expect(getOrderNumber(state)).toBe("");
    });
    it("should be set to the orderNumber on ON_PAY_RESPONSE", () => {
      const state = reducer(undefined, {
        type: ON_ORDER_RESPONSE,
        payload: { orderNumber: "1234567" },
      });
      expect(getOrderNumber(state)).toBe("1234567");
    });
    [ON_ORDER, FETCH_BRAINTREE_TOKEN_REQUEST].forEach((type) => {
      it(`should be set to empty on ${type}`, () => {
        const state = reducer({ orderNumber: "1234567" } as State, {
          type,
          payload: { customerDetails: {} },
        });
        expect(getOrderNumber(state)).toBe("");
      });
    });
  });
});
