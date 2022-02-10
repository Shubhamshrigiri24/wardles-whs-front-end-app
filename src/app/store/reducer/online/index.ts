import { handleActions } from "redux-actions";
import {
  allOnlineServices,
  Ed,
  State,
  Pack,
  Product,
  defaultProduct,
  defaultPack,
  SET_PACK,
  SET_PRODUCT,
  SetPackAction,
  SetProductAction,
  FetchProductsResponseAction,
  FETCH_PRODUCTS_RESPONSE,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_BRAINTREE_TOKEN_REQUEST,
  FETCH_BRAINTREE_TOKEN_RESPONSE,
  ON_ORDER_FAILURE,
  ON_ORDER_REQUEST,
  ON_ORDER_RESPONSE,
  ON_ORDER,
  CLEAR_ORDER_FAILURE_ERROR,
  OrderResponseAction,
  SetConsultationAction,
  SetIsConsultationValidForOrderAction,
  OnlineQuestion,
  SetOnlineServiceAction,
  OnlineService,
  SET_ONLINE_SERVICE,
  CHECK_PRODUCT_TOKEN_RESPONSE,
  CHECK_PRODUCT_TOKEN_FAILURE,
  CHECK_PRODUCT_TOKEN_REQUEST,
  CheckProductTokenResponseAction,
  SET_PRODUCT_TOKEN,
  SetProductTokenAction,
  INVALIDATE_PRODUCT_TOKEN,
  SEND_CONSULTATION_REQUEST,
  SEND_CONSULTATION_RESPONSE,
  SEND_CONSULTATION_FAILURE,
  SendConsultationSuccessfulResponse,
} from "./types";
import { combineReducers, Reducer } from "redux";
import { GENERIC_ERROR_MESSAGE } from "app/store/config";
import {
  FetchBraintreeTokenResponseAction,
  PaymentFailureAction,
  SET_CONSULTATION,
  SET_IS_CONSULTATION_VALID_FOR_ORDER,
  START_TRIPETTO,
} from "./types";
import { ORDER_ACTIONS } from "app/store/reducer/order/constants";

const selectedOnlineService = handleActions(
  {
    [SET_ONLINE_SERVICE]: (
      _state: OnlineService,
      action: SetOnlineServiceAction
    ) => {
      return action.payload ? action.payload.selectedOnlineService : Ed;
    },
  },
  Ed
);

const onlineServices = handleActions({}, allOnlineServices);

const selectedPack = handleActions(
  {
    [SET_PACK]: (_state: Pack, action: SetPackAction) => {
      return action.payload ? action.payload.selectedPack : defaultPack;
    },
  },
  defaultPack
);

const selectedProduct = handleActions(
  {
    [SET_PRODUCT]: (_state: Product, action: SetProductAction) => {
      return action.payload ? action.payload.selectedProduct : defaultProduct;
    },
  },
  defaultProduct
);

const products = handleActions(
  {
    [FETCH_PRODUCTS_RESPONSE]: (
      _state: Product[],
      action: FetchProductsResponseAction
    ) => {
      return action.payload ? action.payload : [];
    },
    [FETCH_PRODUCTS_FAILURE]: () => [],
    [FETCH_PRODUCTS_REQUEST]: () => [],
    [START_TRIPETTO]: () => [],
  },
  [defaultProduct]
);

const productToken = handleActions(
  {
    [SET_PRODUCT_TOKEN]: (
      _state: string | null,
      action: SetProductTokenAction
    ) => action.payload,
    [INVALIDATE_PRODUCT_TOKEN]: (_state: string | null) => null,
  },
  null
);

const productTokenValid = handleActions(
  {
    [CHECK_PRODUCT_TOKEN_RESPONSE]: (
      _state: boolean,
      action: CheckProductTokenResponseAction
    ) => {
      return !!action.payload.status;
    },
    [CHECK_PRODUCT_TOKEN_FAILURE]: () => false,
    [CHECK_PRODUCT_TOKEN_REQUEST]: () => true,
  },
  true
);

const fetching = handleActions(
  {
    [FETCH_PRODUCTS_REQUEST]: () => true,
    [FETCH_PRODUCTS_RESPONSE]: () => false,
    [FETCH_PRODUCTS_FAILURE]: () => false,
  },
  true
);

const braintreeToken = handleActions(
  {
    [ON_ORDER]: () => "",
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => "",
    [FETCH_BRAINTREE_TOKEN_RESPONSE]: (
      _state: string,
      action: FetchBraintreeTokenResponseAction
    ) => action.payload.token,
    [START_TRIPETTO]: () => "",
  },
  ""
);

const orderErrorMessage = handleActions(
  {
    [ON_ORDER_FAILURE]: (_state: string, action: PaymentFailureAction) =>
      action?.payload?.response?.message || GENERIC_ERROR_MESSAGE,
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => "",
    [ON_ORDER]: () => "",
    [CLEAR_ORDER_FAILURE_ERROR]: () => "",
  },
  ""
);

const successfulOrder = handleActions(
  {
    [ON_ORDER_FAILURE]: () => false,
    [ON_ORDER_REQUEST]: () => false,
    [SET_CONSULTATION]: () => false,
    [ON_ORDER_RESPONSE]: () => true,
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => false,
  },
  false
);

const consultationResponses = handleActions(
  {
    [SET_CONSULTATION]: (
      _state: OnlineQuestion[],
      action: SetConsultationAction
    ) => action?.payload?.consultation || [],
    [START_TRIPETTO]: () => [],
    [ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE]: () => [],
  },
  []
);

const consultationToken = handleActions(
  {
    [SEND_CONSULTATION_REQUEST]: () => null,
    [SEND_CONSULTATION_RESPONSE]: (
      _,
      action: SendConsultationSuccessfulResponse
    ) => action.payload ?? null,
    [SEND_CONSULTATION_FAILURE]: () => null,
    [START_TRIPETTO]: () => null,
    [ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE]: () => null,
  },
  null
);

const isConsultationValidForOrder = handleActions(
  {
    [SET_IS_CONSULTATION_VALID_FOR_ORDER]: (
      state: boolean,
      action: SetIsConsultationValidForOrderAction
    ) => action.payload,
    [START_TRIPETTO]: () => false,
    [ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE]: () => false,
  },
  false
);

const consultation = combineReducers({
  responses: consultationResponses,
  token: consultationToken,
  isValidForOrder: isConsultationValidForOrder,
});

const orderNumber = handleActions(
  {
    [ON_ORDER_RESPONSE]: (_state: string, action: OrderResponseAction) =>
      action?.payload?.orderNumber,
    [FETCH_BRAINTREE_TOKEN_REQUEST]: () => "",
    [ON_ORDER]: () => "",
  },
  ""
);

const reducer: Reducer<State, any> = combineReducers({
  selectedOnlineService,
  onlineServices,
  selectedPack,
  selectedProduct,
  products,
  productToken,
  productTokenValid,
  fetching,
  braintreeToken,
  successfulOrder,
  orderErrorMessage,
  consultation,
  orderNumber,
});

export default reducer;
