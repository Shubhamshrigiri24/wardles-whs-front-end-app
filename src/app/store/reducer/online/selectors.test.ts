import { makeOnlineQuestions, makeProduct } from "../mock";
import {
  getBraintreeToken,
  getConsultationResponses,
  getOnlineServices,
  getOrderErrorMessage,
  getOrderNumber,
  getProducts,
  getSuccessfulOrder,
} from "./selectors";

import { allOnlineServices, Ed, State } from "./types";

const mockState: State = {
  products: [makeProduct()],
  braintreeToken: "token",
  consultation: {
    responses: makeOnlineQuestions(),
    token: null,
    isValidForOrder: true,
  },
  fetching: true,
  onlineServices: allOnlineServices,
  orderErrorMessage: "error",
  orderNumber: "1234567",
  selectedOnlineService: Ed,
  selectedPack: makeProduct().packs[0],
  selectedProduct: makeProduct(),
  successfulOrder: true,
  productToken: null,
  productTokenValid: false,
};

describe("Selectors", () => {
  describe("Get list of products", () => {
    it("Returns the list of products", () => {
      const mockProducts = [makeProduct()];
      const products = getProducts(mockState);
      expect(products).toEqual(mockProducts);
    });
  });

  describe("Get consultation", () => {
    it("Returns the consultation", () => {
      const questions = makeOnlineQuestions();
      const consultation = getConsultationResponses(mockState);
      expect(consultation).toEqual(questions);
    });
  });

  describe("getBraintreeToken", () => {
    it("Returns the braintree token", () => {
      const result = getBraintreeToken(mockState);
      expect(result).toEqual(mockState.braintreeToken);
    });
  });

  describe("getSuccessfulOrder", () => {
    it("Returns the successfulOrder", () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const result = getSuccessfulOrder(mockState);
      expect(result).toEqual(mockState.successfulOrder);
    });
  });

  describe("getOrderErrorMessage", () => {
    it("Returns the orderErrorMessage", () => {
      const result = getOrderErrorMessage(mockState);
      expect(result).toEqual(mockState.orderErrorMessage);
    });
  });

  describe("getOrderNumber", () => {
    it("Returns the orderNumber", () => {
      const result = getOrderNumber(mockState);
      expect(result).toEqual(mockState.orderNumber);
    });
  });

  describe("get Online Services", () => {
    it("Returns all online services", () => {
      const result = getOnlineServices(mockState);
      expect(result).toEqual(mockState.onlineServices);
    });
  });
});
