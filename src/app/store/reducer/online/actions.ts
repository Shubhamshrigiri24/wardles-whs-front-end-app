import {
  START_TRIPETTO,
  StartTripettoAction,
  Product,
  SET_PRODUCT,
  SetProductAction,
  SET_PACK,
  SetPackAction,
  Pack,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_RESPONSE,
  FetchProductsAction,
  ON_ORDER_REQUEST,
  ON_ORDER,
  ON_ORDER_RESPONSE,
  ON_ORDER_FAILURE,
  OnOrderAction,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  FETCH_BRAINTREE_TOKEN_FAILURE,
  FETCH_BRAINTREE_TOKEN,
  FetchBraintreeTokenAction,
  SET_CONSULTATION,
  SET_IS_CONSULTATION_VALID_FOR_ORDER,
  SetConsultationAction,
  CLEAR_ORDER_FAILURE_ERROR,
  OnlineQuestion,
  SetOnlineServiceAction,
  SET_ONLINE_SERVICE,
  OnlineService,
  SuccessfulConsultationResponse,
  CheckProductTokenAction,
  CHECK_PRODUCT_TOKEN,
  CHECK_PRODUCT_TOKEN_REQUEST,
  CHECK_PRODUCT_TOKEN_RESPONSE,
  CHECK_PRODUCT_TOKEN_FAILURE,
  SetProductTokenAction,
  SET_PRODUCT_TOKEN,
  INVALIDATE_PRODUCT_TOKEN,
  InvalidateProductTokenAction,
  INVALIDATE_PRODUCT_TOKEN_REQUEST,
  INVALIDATE_PRODUCT_TOKEN_RESPONSE,
  INVALIDATE_PRODUCT_TOKEN_FAILURE,
  Send1315EmailAction,
  SEND_1315_EMAIL,
  SEND_1315_EMAIL_REQUEST,
  SEND_1315_EMAIL_RESPONSE,
  SEND_1315_EMAIL_FAILURE,
  SEND_CONSULTATION,
  SEND_CONSULTATION_FAILURE,
  SEND_CONSULTATION_REQUEST,
  SEND_CONSULTATION_RESPONSE,
  SendConsultationAction,
  SetIsConsultationValidForOrderAction,
  OnlineQuestionType,
} from "./types";
import { run } from "tripetto-runner-chat";
import Services from "tripetto-services";
import { Export } from "tripetto-runner-foundation";
import { API_ENDPOINT } from "../../config";
import { RSAA } from "redux-api-middleware";
import { CustomerDetails, DeliveryDetails } from "../checkout/types";
import { getHana1315EmailDetails } from "../../../../utils/onlineServiceConsultation";
import { differenceWith, isEqual, last } from "lodash";

function getType(f: Export.IExportableField): OnlineQuestionType {
  switch (f.datatype) {
    case "boolean":
      return "bool";
    case "numeric":
      if (Number.isInteger(f.value)) {
        return "int";
      }
  }
  return "string";
}

export function startTripetto(
  onlineServiceId: string,
  element: React.MutableRefObject<null>,
  handleSuccessfulConsultation: (
    data: SuccessfulConsultationResponse[]
  ) => void,
  onAnswerEditStarted: ({
    question,
    answer,
  }: {
    question?: string;
    answer?: string;
  }) => void
): StartTripettoAction {
  const {
    styles,
    l10n,
    locale,
    translations,
    definition: definitionFromInit,
  } = Services.init({
    token:
      process.env[
        `REACT_APP_${onlineServiceId.toUpperCase()}_TRIPETTO_PUBLIC_TOKEN`!
      ]!,
  });
  let lastConsultationState: Export.IExportableField[] | undefined;
  let currentQuestion: Export.IExportableField | undefined;
  run({
    element: element.current,
    definition: definitionFromInit as any,
    styles,
    l10n,
    locale,
    translations,
    onData: (instance) => {
      const consultation = Export.exportables(instance).fields;

      const data = consultation.map((f) => ({
        initialQuestion: f.node.name,
        question: f.name,
        answer: f.value,
        answerString: f.string,
        type: getType(f),
        kind: f.type,
      }));

      const values = data
        .filter(({ answer }) => answer !== undefined)
        .filter(
          ({ kind, answer }) => kind !== "tripetto-block-checkboxes" || answer
        )
        .map((response, i) => ({
          number: i,
          initialQuestion: response.initialQuestion,
          question: response.question,
          questionQithAnswer: response.question,
          answer: response.answerString,
          type: response.type,
        }));

      const newCurrentQuestion = differenceWith(
        consultation,
        lastConsultationState ?? consultation.slice(1),
        isEqual
      )[0];

      currentQuestion = newCurrentQuestion;
      lastConsultationState = consultation;

      const lastAnsweredQuestion = last(values);

      if (
        lastAnsweredQuestion &&
        values.find(
          (value) => value.initialQuestion === currentQuestion?.node.name
        )
      ) {
        onAnswerEditStarted({
          question: lastAnsweredQuestion.initialQuestion,
          answer: lastAnsweredQuestion.questionQithAnswer,
        });
      }
    },
    onSubmit: (instance) => {
      const fields = Export.exportables(instance).fields;
      const data = fields.map((f) => ({
        initialQuestion: f.node.name,
        question: f.name,
        answer: f.value,
        answerString: f.string,
        type: getType(f),
        kind: f.type,
      }));
      handleSuccessfulConsultation(data);
      return;
    },
  });

  return {
    type: START_TRIPETTO,
  };
}

export function fetchProducts(onlineServiceId: string): FetchProductsAction {
  return {
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
}

export function setProductToken(token: string): SetProductTokenAction {
  return {
    type: SET_PRODUCT_TOKEN,
    payload: token,
  };
}

export function checkProductToken(token: string): CheckProductTokenAction {
  return {
    type: CHECK_PRODUCT_TOKEN,
    [RSAA]: {
      endpoint: `${API_ENDPOINT}/singleusetoken?token=${token}`,
      method: "GET",
      types: [
        CHECK_PRODUCT_TOKEN_REQUEST,
        CHECK_PRODUCT_TOKEN_RESPONSE,
        CHECK_PRODUCT_TOKEN_FAILURE,
      ],
    },
  };
}

export function invalidateProductToken(
  token: string
): InvalidateProductTokenAction {
  return {
    type: INVALIDATE_PRODUCT_TOKEN,
    [RSAA]: {
      endpoint: `${API_ENDPOINT}/singleusetoken/invalidate?token=${token}`,
      method: "POST",
      types: [
        INVALIDATE_PRODUCT_TOKEN_REQUEST,
        INVALIDATE_PRODUCT_TOKEN_RESPONSE,
        INVALIDATE_PRODUCT_TOKEN_FAILURE,
      ],
    },
  };
}

export function setProduct(product: Product): SetProductAction {
  return {
    type: SET_PRODUCT,
    payload: {
      selectedProduct: product,
    },
  };
}

export function setPack(pack: Pack): SetPackAction {
  return {
    type: SET_PACK,
    payload: {
      selectedPack: pack,
    },
  };
}

export interface CreateOrderInput {
  paymentNonce: string;
  consultation: OnlineQuestion[];
  customerDetails: CustomerDetails;
  deliveryDetails: DeliveryDetails;
  basket: Pack[];
}

export function onOrder(
  input: CreateOrderInput,
  endpoint: string = API_ENDPOINT
): OnOrderAction {
  return {
    type: ON_ORDER,
    [RSAA]: {
      endpoint: `${endpoint}/online/order`,
      method: "POST",
      types: [ON_ORDER_REQUEST, ON_ORDER_RESPONSE, ON_ORDER_FAILURE],
      body: JSON.stringify({
        paymentNonce: input.paymentNonce,
        email: input.customerDetails.email,
        firstName: input.customerDetails.firstName,
        lastName: input.customerDetails.lastName,
        phone: input.customerDetails.phone,
        address: {
          line1: input.customerDetails.line1,
          line2: input.customerDetails.line2,
          city: input.customerDetails.city,
          postcode: input.customerDetails.postcode,
        },
        shippingAddress: {
          line1: input.deliveryDetails.line1,
          line2: input.deliveryDetails.line2,
          city: input.deliveryDetails.city,
          postcode: input.deliveryDetails.postcode,
        },
        basket: input.basket.map((b) => {
          return {
            sku: b.sku,
            quantity: 1,
          };
        }),
        consultation: input.consultation,
      }),
    },
  };
}

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

function sendConsultation(
  service: string,
  consultation: OnlineQuestion[],
  endpoint: string = API_ENDPOINT
): SendConsultationAction {
  return {
    type: SEND_CONSULTATION,
    [RSAA]: {
      endpoint: `${endpoint}/online/consultation`,
      method: "POST",
      body: JSON.stringify({
        service,
        consultation: consultation.map((q) => {
          switch (q.type) {
            case "bool":
              return {
                number: q.number,
                question: q.question,
                answerBool: q.answer === "true",
              };
            case "int":
              return {
                number: q.number,
                question: q.question,
                answerInt: parseInt(q.answer),
              };
            case "string":
            default:
              return {
                number: q.number,
                question: q.question,
                answerString: q.answer,
              };
          }
        }),
      }),
      types: [
        SEND_CONSULTATION_REQUEST,
        SEND_CONSULTATION_RESPONSE,
        SEND_CONSULTATION_FAILURE,
      ],
    },
  };
}

export function setIsConsultationValidForOrder(
  payload: boolean
): SetIsConsultationValidForOrderAction {
  return {
    type: SET_IS_CONSULTATION_VALID_FOR_ORDER,
    payload,
  };
}

function _setConsultation(
  consultation: OnlineQuestion[]
): SetConsultationAction {
  return {
    type: SET_CONSULTATION,
    payload: {
      consultation,
    },
  };
}

export function makeSetConsultation(dispatch: Function) {
  return (service: string, consultation: OnlineQuestion[]) => {
    dispatch(_setConsultation(consultation));
    dispatch(sendConsultation(service, consultation));
  };
}

export function clearOrderFailureError() {
  return {
    type: CLEAR_ORDER_FAILURE_ERROR,
  };
}

export function setOnlineService(
  service: OnlineService
): SetOnlineServiceAction {
  return {
    type: SET_ONLINE_SERVICE,
    payload: {
      selectedOnlineService: service,
    },
  };
}

export function sendHana1315Email(
  consultation: OnlineQuestion[]
): Send1315EmailAction {
  const details = getHana1315EmailDetails(consultation);
  return {
    type: SEND_1315_EMAIL,
    [RSAA]: {
      endpoint: `${API_ENDPOINT}/hanaemail`,
      method: "POST",
      body: JSON.stringify(details),
      types: [
        SEND_1315_EMAIL_REQUEST,
        SEND_1315_EMAIL_RESPONSE,
        SEND_1315_EMAIL_FAILURE,
      ],
    },
  };
}
