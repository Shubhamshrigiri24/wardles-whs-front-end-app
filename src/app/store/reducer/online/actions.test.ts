import {
  setProduct,
  fetchProducts,
  makeSetConsultation,
  onOrder,
  CreateOrderInput,
  fetchToken,
  clearOrderFailureError,
  setOnlineService,
  startTripetto,
} from "./actions";
import { API_ENDPOINT } from "../../config";
import { RSAA } from "redux-api-middleware";
import {
  SET_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_RESPONSE,
  FETCH_PRODUCTS_FAILURE,
  SET_CONSULTATION,
  ON_ORDER,
  ON_ORDER_REQUEST,
  ON_ORDER_RESPONSE,
  ON_ORDER_FAILURE,
  FETCH_BRAINTREE_TOKEN,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  FETCH_BRAINTREE_TOKEN_FAILURE,
  CLEAR_ORDER_FAILURE_ERROR,
  SET_ONLINE_SERVICE,
  START_TRIPETTO,
  SEND_CONSULTATION_REQUEST,
  SEND_CONSULTATION_RESPONSE,
  SEND_CONSULTATION_FAILURE,
  SEND_CONSULTATION,
  OnlineServiceIds,
  SuccessfulConsultationResponse,
} from "./types";
import {
  customerDetails,
  deliveryDetails,
  makeOnlineQuestions,
  makeProduct,
  makeSuccessfulConsultationResponse,
} from "../mock";
import { run as mockRun } from "tripetto-runner-chat";
import mockServices from "tripetto-services";
import { Export as MockExport } from "tripetto-runner-foundation";

jest.mock("tripetto-runner-chat");
jest.mock("tripetto-services");
jest.mock("tripetto-runner-foundation");

const env = { ...process.env };
afterEach(() => {
  process.env = { ...env };
  jest.resetAllMocks();
});

describe("actions", () => {
  describe("Set Product", () => {
    it("should create an action to set a product", () => {
      const product = makeProduct();
      const expectedAction = {
        type: SET_PRODUCT,
        payload: {
          selectedProduct: product,
        },
      };
      expect(setProduct(product)).toEqual(expectedAction);
    });
  });
  describe("Fetch Products", () => {
    it("should create an action to get products", () => {
      const onlineServiceId = OnlineServiceIds.ed;
      const expectedAction = {
        type: FETCH_PRODUCTS,
        [RSAA]: {
          endpoint: `${API_ENDPOINT}/online/${onlineServiceId}/products`,
          method: "GET",
          types: [
            FETCH_PRODUCTS_REQUEST,
            FETCH_PRODUCTS_RESPONSE,
            FETCH_PRODUCTS_FAILURE,
          ],
        },
      };

      expect(fetchProducts(onlineServiceId)).toEqual(expectedAction);
    });
  });

  describe("Set Consultation", () => {
    it("should create an action to set the consultation", () => {
      const consultation = makeOnlineQuestions();
      const expectedAction = {
        type: SET_CONSULTATION,
        payload: {
          consultation,
        },
      };
      const dispatch = jest.fn();
      const setConsultation = makeSetConsultation(dispatch);
      const serviceId = "service";
      setConsultation(serviceId, consultation);
      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toBeCalledWith(expectedAction);
      expect(dispatch).toBeCalledWith({
        [RSAA]: {
          body: JSON.stringify({
            service: "service",
            consultation: consultation.map((c) => ({
              number: c.number,
              question: c.question,
              answerString: c.answer,
            })),
          }),
          endpoint: `${API_ENDPOINT}/online/consultation`,
          method: "POST",
          types: [
            SEND_CONSULTATION_REQUEST,
            SEND_CONSULTATION_RESPONSE,
            SEND_CONSULTATION_FAILURE,
          ],
        },
        type: SEND_CONSULTATION,
      });
    });
  });

  describe("onOrder", () => {
    it("should create an action to send an API call to create an online order", () => {
      const createOrderInput: CreateOrderInput = {
        customerDetails: customerDetails,
        deliveryDetails: deliveryDetails,
        paymentNonce: "payment-nonce",
        consultation: makeOnlineQuestions(),
        basket: [makeProduct().packs[0]],
      };
      const expectedAction = {
        type: ON_ORDER,
        [RSAA]: {
          endpoint: `${API_ENDPOINT}/online/order`,
          method: "POST",
          types: [ON_ORDER_REQUEST, ON_ORDER_RESPONSE, ON_ORDER_FAILURE],
          body: JSON.stringify({
            paymentNonce: createOrderInput.paymentNonce,
            email: createOrderInput.customerDetails.email,
            firstName: createOrderInput.customerDetails.firstName,
            lastName: createOrderInput.customerDetails.lastName,
            phone: createOrderInput.customerDetails.phone,
            address: {
              line1: createOrderInput.customerDetails.line1,
              line2: createOrderInput.customerDetails.line2,
              city: createOrderInput.customerDetails.city,
              postcode: createOrderInput.customerDetails.postcode,
            },
            shippingAddress: {
              line1: createOrderInput.deliveryDetails.line1,
              line2: createOrderInput.deliveryDetails.line2,
              city: createOrderInput.deliveryDetails.city,
              postcode: createOrderInput.deliveryDetails.postcode,
            },
            basket: createOrderInput.basket.map((b) => {
              return {
                sku: b.sku,
                quantity: 1,
              };
            }),
            consultation: createOrderInput.consultation,
          }),
        },
      };
      expect(onOrder(createOrderInput)).toEqual(expectedAction);
    });
  });

  describe("fetchToken", () => {
    it("should create an action to send an API call to get a braintree token", () => {
      const expectedAction = {
        type: FETCH_BRAINTREE_TOKEN,
        [RSAA]: {
          endpoint: `${API_ENDPOINT}/paymenttoken`,
          method: "GET",
          types: [
            FETCH_BRAINTREE_TOKEN_REQUEST,
            FETCH_BRAINTREE_TOKEN_RESPONSE,
            FETCH_BRAINTREE_TOKEN_FAILURE,
          ],
        },
      };
      expect(fetchToken()).toEqual(expectedAction);
    });
  });

  describe("clearOrderFailureError", () => {
    it("should create an action that dispatches a CLEAR_ORDER_FAILURE_ERROR event ", () => {
      const expectedAction = {
        type: CLEAR_ORDER_FAILURE_ERROR,
      };
      expect(clearOrderFailureError()).toEqual(expectedAction);
    });
  });

  describe("setOnlineService", () => {
    it("should create an action that dispatches a SET_ONLINE_SERVICE event ", () => {
      const expectedAction = {
        type: SET_ONLINE_SERVICE,
        payload: {
          selectedOnlineService: {
            id: "service",
            name: "Name of Service",
          },
        },
      };
      expect(
        setOnlineService({
          id: "service",
          name: "Name of Service",
        })
      ).toEqual(expectedAction);
    });
  });

  describe("startTrepetto", () => {
    const serviceId = "id";
    const elementRef = { current: null };
    const tripettoToken = "token";

    beforeEach(() => {
      process.env[
        `REACT_APP_${serviceId.toUpperCase()}_TRIPETTO_PUBLIC_TOKEN`
      ] = tripettoToken;
    });

    it("should return a START_TRIPETTO event and start tripetto", () => {
      const styles = Symbol();
      const l10n = Symbol();
      const locale = Symbol();
      const translations = Symbol();
      const definition = Symbol();

      (mockServices.init as unknown as jest.Mock).mockReturnValue({
        styles,
        l10n,
        locale,
        translations,
        definition,
      });

      expect(
        startTripetto(
          serviceId,
          elementRef,
          () => {},
          () => {}
        )
      ).toEqual({
        type: START_TRIPETTO,
      });
      expect(mockServices.init).toBeCalledTimes(1);
      expect(mockServices.init).toBeCalledWith({ token: tripettoToken });
      expect(mockRun as unknown as jest.Mock).toBeCalledTimes(1);
      expect(mockRun as unknown as jest.Mock).toBeCalledWith({
        element: elementRef.current,
        styles,
        l10n,
        locale,
        translations,
        definition,
        onSubmit: expect.any(Function),
        onData: expect.any(Function),
      });
    });

    it("should transform and send submitted answers to onSuccess when consultation submitted", () => {
      const onSuccess = jest.fn();
      (mockServices.init as unknown as jest.Mock).mockReturnValue({
        styles: null,
        l10n: null,
        locale: null,
        translations: null,
        definition: null,
      });
      startTripetto(serviceId, elementRef, onSuccess, () => {});

      const instance = Symbol();
      const responses = [
        makeSuccessfulConsultationResponse("1"),
        makeSuccessfulConsultationResponse("2", {
          kind: "trepetto-input-type",
          answerString: "TRUE",
          answer: true,
          type: "bool",
        }),
      ];
      (MockExport.exportables as unknown as jest.Mock).mockReturnValue({
        fields: [
          makeExportable(responses[0], {
            datatype: "numeric",
            key: "1",
          }),
          makeExportable(responses[1], {
            datatype: "boolean",
            key: "2",
          }),
        ] as MockExport.IExportableField[],
      });
      expect(
        (mockRun as unknown as jest.Mock).mock.calls[0][0].onSubmit(instance)
      ).toBeUndefined();
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledTimes(1);
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledWith(
        instance
      );
      expect(onSuccess).toBeCalledTimes(1);
      expect(onSuccess).toBeCalledWith(responses);
    });

    it("should send the latest edited question to onData if callback", () => {
      const onAnswer = jest.fn();
      (mockServices.init as unknown as jest.Mock).mockReturnValue({
        styles: null,
        l10n: null,
        locale: null,
        translations: null,
        definition: null,
      });
      startTripetto(serviceId, elementRef, () => {}, onAnswer);

      const instance = Symbol();
      const responses = [
        makeSuccessfulConsultationResponse("1"),
        makeSuccessfulConsultationResponse("2"),
      ];

      (MockExport.exportables as unknown as jest.Mock).mockReturnValue({
        fields: [
          makeExportable(responses[0], {
            datatype: "numeric",
            value: 1,
            string: "1",
            node: {
              id: "id-1",
              key: "key-1",
              context: "",
              name: responses[0].question,
            },
          }),
          makeExportable(responses[1], {
            value: null,
            string: "",
            datatype: "boolean",
            node: {
              id: "id-2",
              key: "key-2",
              context: "",
              name: responses[1].question,
            },
          }),
        ],
      });
      expect(() =>
        (mockRun as unknown as jest.Mock).mock.calls[0][0].onData(instance)
      ).not.toThrow();
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledTimes(1);
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledWith(
        instance
      );
      expect(onAnswer).toBeCalledTimes(1);

      onAnswer.mockClear();
      (MockExport.exportables as unknown as jest.Mock).mockReset();

      (MockExport.exportables as unknown as jest.Mock).mockReturnValue({
        fields: [
          makeExportable(responses[0], {
            datatype: "numeric",
            value: 1,
            string: "1",
            node: {
              id: "id-1",
              key: "key-1",
              context: "",
              name: responses[0].question,
            },
          }),
          makeExportable(responses[1], {
            value: true,
            string: "TRUE",
            datatype: "boolean",
            node: {
              id: "id-2",
              key: "key-2",
              context: "",
              name: responses[1].question,
            },
          }),
        ] as MockExport.IExportableField[],
      });

      expect(() =>
        (mockRun as unknown as jest.Mock).mock.calls[0][0].onData(instance)
      ).not.toThrow();
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledTimes(1);
      expect(MockExport.exportables as unknown as jest.Mock).toBeCalledWith(
        instance
      );
      expect(onAnswer).toBeCalledTimes(1);
    });
  });
});

function makeExportable(
  response: SuccessfulConsultationResponse,
  override?: Partial<MockExport.IExportableField>
): MockExport.IExportableField {
  return {
    type: response.kind,
    name: response.question,
    value: response.answer,
    string: response.answerString,
    datatype: "type",
    key: "key",
    modified: false,
    slot: "slot",
    version: "test",
    node: {
      context: "",
      id: "id",
      key: "key",
      name: response.question,
    },
    ...override,
  };
}
