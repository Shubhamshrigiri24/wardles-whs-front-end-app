import React from "react";
import { RSAA } from "redux-api-middleware";
import { TSerializeTypes } from "tripetto-runner-foundation";
import { PackDiscount } from "app/store/reducer/order/types";

export interface State {
  onlineServices: OnlineService[];
  selectedOnlineService: OnlineService;
  selectedPack: Pack;
  selectedProduct: Product;
  products: Product[];
  productToken: string | null;
  productTokenValid: boolean;
  fetching: boolean;
  successfulOrder: boolean;
  braintreeToken: string;
  orderErrorMessage: string;
  consultation: {
    responses: OnlineQuestion[];
    token: string | null;
    isValidForOrder: boolean;
  };
  orderNumber: string;
}

export const START_TRIPETTO = "ONLINE/START_TRIPETTO";

export interface StartTripettoAction {
  type: string;
}

export enum OnlineServiceIds {
  ed = "ed",
  hana = "hana",
}

export enum OnlineProductIds {
  viagra = "viagra",
  sildenafil = "sildenafil",
  hana = "hana",
}

// export enum OnlineAccountItemsIds {
//   subscriptions = "subscriptions",
//   orders = "orders",
// }

export interface OnlineService {
  id: string;
  name: string;
}

export const Ed: OnlineService = {
  id: OnlineServiceIds.ed,
  name: "Erectile Dysfunction",
};

export const Hana: OnlineService = {
  id: OnlineServiceIds.hana,
  name: "Hana",
};

export const OnlineServiceName: { [key in OnlineServiceIds]: string } = {
  ed: "Erectile Dysfunction",
  hana: "Hana",
};

export enum ServiceTextKey {
  beforeTitle = "beforeTitle",
  title = "title",
  info1 = "info1",
  info2 = "info2",
}

export type ServiceTextValue = {
  [key in ServiceTextKey]: string | JSX.Element | null;
};

export const TextByServiceMap: { [name: string]: ServiceTextValue } = {
  ed: {
    beforeTitle: "Treatment options",
    title: (
      <>
        Almost done...
        <br /> Choose your pack size
      </>
    ),
    info1:
      "Please select a pack size from the options available below, then continue to checkout.",
    info2: null,
  },
  hana: {
    beforeTitle: "Contraception options",
    title: (
      <>
        Great, thank you!
        <br /> Here are your contraception options
      </>
    ),
    info1:
      "Thanks for answering those questions. You can choose your contraception from the options below, then complete checkout.",
    info2: null,
  },
};

export interface OnlineServiceParamTypes {
  onlineServiceId: OnlineServiceIds;
  productId?: OnlineProductIds;
  // accountItemsId?: OnlineAccountItemsIds;
}

export const allOnlineServices = [Ed, Hana];

export const defaultOnlineService = Ed;

export interface Pack {
  name: string;
  sku: string;
  label: string;
  itemsPerPack: number;
  basePrice: number;
  price: number;
  discounts: PackDiscount[];
  pricePerUnit: number;
  isBestValue?: boolean;
  delivery?: {
    type: "FREE" | "PREMIUM";
    price: number;
  };
}

export interface Product {
  id: string;
  name: string;
  packs: Pack[];
  service: string;
  variant?: string;
}

export const defaultProduct: Product = {
  id: OnlineProductIds.viagra,
  name: "Viagra Connect",
  packs: [],
  service: OnlineServiceIds.ed,
  variant: "",
};

export const defaultPack: Pack = {
  name: "",
  sku: "",
  label: "",
  itemsPerPack: 0,
  basePrice: 0,
  price: 0,
  isBestValue: false,
  pricePerUnit: 0,
  discounts: [],
};

export const FETCH_PRODUCTS = "PRODUCTS/FETCH_PRODUCTS";
export const FETCH_PRODUCTS_REQUEST = "PRODUCTS/FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_RESPONSE = "PRODUCTS/FETCH_PRODUCTS_RESPONSE";
export const FETCH_PRODUCTS_FAILURE = "PRODUCTS/FETCH_PRODUCTS_FAILURE";

export interface FetchProductsAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    types: [string, string, string];
  };
}

export interface FetchProductsResponseAction {
  type: string;
  payload: Product[];
}

export interface SetPackAction {
  type: string;
  payload: {
    selectedPack: Pack;
  };
}

export const SET_PRODUCT_TOKEN = "PRODUCTS/SET_PRODUCT_TOKEN";

export interface SetProductTokenAction {
  type: string;
  payload: string | null;
}

export const CHECK_PRODUCT_TOKEN = "PRODUCTS/CHECK_PRODUCT_TOKEN";
export const CHECK_PRODUCT_TOKEN_REQUEST =
  "PRODUCTS/CHECK_PRODUCT_TOKEN_REQUEST";
export const CHECK_PRODUCT_TOKEN_RESPONSE =
  "PRODUCTS/CHECK_PRODUCT_TOKEN_RESPONSE";
export const CHECK_PRODUCT_TOKEN_FAILURE =
  "PRODUCTS/CHECK_PRODUCT_TOKEN_FAILURE";

export interface CheckProductTokenAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    types: [string, string, string];
  };
}

export interface CheckProductTokenResponseAction {
  type: string;
  payload: {
    token?: string;
    status?: boolean;
    message?: string;
  };
}

export const INVALIDATE_PRODUCT_TOKEN = "PRODUCTS/INVALIDATE_PRODUCT_TOKEN";
export const INVALIDATE_PRODUCT_TOKEN_REQUEST =
  "PRODUCTS/INVALIDATE_PRODUCT_TOKEN_REQUEST";
export const INVALIDATE_PRODUCT_TOKEN_RESPONSE =
  "PRODUCTS/INVALIDATE_PRODUCT_TOKEN_RESPONSE";
export const INVALIDATE_PRODUCT_TOKEN_FAILURE =
  "PRODUCTS/INVALIDATE_PRODUCT_TOKEN_FAILURE";

export interface InvalidateProductTokenAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    types: string[];
  };
}

export interface SetProductAction {
  type: string;
  payload: {
    selectedProduct: Product;
  };
}
export const SET_PRODUCT = "PRODUCT/SET_PRODUCT";

export const SET_PACK = "PRODUCT/SET_PACK";

export const FETCH_BRAINTREE_TOKEN = "ONLINE/FETCH_BRAINTREE_TOKEN";
export const FETCH_BRAINTREE_TOKEN_REQUEST =
  "ONLINE/FETCH_BRAINTREE_TOKEN_REQUEST";
export const FETCH_BRAINTREE_TOKEN_RESPONSE =
  "ONLINE/FETCH_BRAINTREE_TOKEN_RESPONSE";
export const FETCH_BRAINTREE_TOKEN_FAILURE =
  "ONLINE/FETCH_BRAINTREE_TOKEN_FAILURE";

export const SEND_CONSULTATION = "ONLINE/SEND_CONSULTATION";
export const SEND_CONSULTATION_REQUEST = "ONLINE/SEND_CONSULTATION_REQUEST";
export const SEND_CONSULTATION_RESPONSE = "ONLINE/SEND_CONSULTATION_RESPONSE";
export const SEND_CONSULTATION_FAILURE = "ONLINE/SEND_CONSULTATION_FAILURE";

export interface SendConsultationAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    body: string;
    types: [string, string, string];
  };
}

export interface SendConsultationSuccessfulResponse {
  type: string;
  payload?: string;
}

export const ON_ORDER = "ONLINE/ON_ORDER";
export const ON_ORDER_REQUEST = "ONLINE/ON_ORDER_REQUEST";
export const ON_ORDER_RESPONSE = "ONLINE/ON_ORDER_RESPONSE";
export const ON_ORDER_FAILURE = "ONLINE/ON_ORDER_FAILURE";

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

export interface OrderResponseAction {
  type: string;
  payload: {
    orderNumber: string;
  };
}

export interface OnOrderAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    body: string;
    types: [string, string, string];
  };
}

export interface OnOrderResponseAction {
  type: string;
  payload: {
    err: string;
  };
}

export type OnlineQuestionType = "string" | "bool" | "int";

export interface OnlineQuestion {
  number: number;
  question: string;
  answer: string;
  type: OnlineQuestionType;
  initialQuestion?: string;
}

export type SuccessfulConsultationResponse = {
  initialQuestion?: string;
  question: string;
  type: OnlineQuestionType;
  answer: TSerializeTypes;
  answerString: string;
  kind: string;
};

export const SET_CONSULTATION = "ONLINE/SET_CONSULTATION";
export const SET_IS_CONSULTATION_VALID_FOR_ORDER =
  "ONLINE/SET_IS_CONSULTATION_VALID_FOR_ORDER";

export interface SetIsConsultationValidForOrderAction {
  type: string;
  payload: boolean;
}

export interface SetConsultationAction {
  type: string;
  payload: {
    consultation: OnlineQuestion[];
  };
}

export const CLEAR_ORDER_FAILURE_ERROR = "ONLINE/CLEAR_ORDER_FAILURE_ERROR";

export interface SetConsultationAction {
  payload: {
    consultation: OnlineQuestion[];
  };
}

export interface SetOnlineServiceAction {
  type: string;
  payload: {
    selectedOnlineService: OnlineService;
  };
}

export const SET_ONLINE_SERVICE = "ONLINE/SET_ONLINE_SERVICE";

export interface ProductSelectionPageQuery {
  token?: string;
}

export const SEND_1315_EMAIL = "ONLINE/SEND_1315_EMAIL";
export const SEND_1315_EMAIL_REQUEST = "ONLINE/SEND_1315_EMAIL_REQUEST";
export const SEND_1315_EMAIL_RESPONSE = "ONLINE/SEND_1315_EMAIL_RESPONSE";
export const SEND_1315_EMAIL_FAILURE = "ONLINE/SEND_1315_EMAIL_FAILURE";

export interface Send1315EmailAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    body: string;
    types: [string, string, string];
  };
}
