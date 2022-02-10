import { handleActions } from "redux-actions";
import { AnyAction, Reducer, combineReducers } from "redux";

import {
  State as OrderState,
  OrderCustomer,
  OrderProduct,
  SetCustomerActionType,
  SetProductActionType,
} from "app/store/reducer/order/types";
import { START_TRIPETTO } from "app/store/reducer/online/types";
import {
  ORDER_ACTIONS,
  CUSTOMER_TYPES,
} from "app/store/reducer/order/constants";

const defaultOrderState: OrderState = {
  customer: { customerType: CUSTOMER_TYPES.GUEST, customerDetails: null },
  product: null,
};

const customerActions = handleActions(
  {
    [ORDER_ACTIONS.SET_CUSTOMER]: (
      _state: OrderCustomer,
      action: AnyAction
    ) => {
      const a = action as SetCustomerActionType;
      const { payload } = a;

      return payload;
    },
    [ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE]: () => defaultOrderState.customer,
    [START_TRIPETTO]: () => defaultOrderState.customer,
  },
  defaultOrderState.customer
);

const productActions = handleActions(
  {
    [ORDER_ACTIONS.SET_PRODUCT]: (_state: OrderProduct, action: AnyAction) => {
      const a = action as SetProductActionType;
      const { payload } = a;

      return payload;
    },
    [ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE]: () => defaultOrderState.product,
    [START_TRIPETTO]: () => defaultOrderState.product,
  },
  defaultOrderState.product
);

const reducer: Reducer<OrderState, any> = combineReducers({
  customer: customerActions,
  product: productActions,
});

export default reducer;
