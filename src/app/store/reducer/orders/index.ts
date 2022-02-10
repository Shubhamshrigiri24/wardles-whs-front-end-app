import { handleActions } from "redux-actions";
import { AnyAction, Reducer, combineReducers } from "redux";

import { ACTION_STATUSES, TActionStatus } from "app/store/types";
import { State as OrdersState, TOrders } from "./types";
import { ORDERS_ACTIONS } from "app/store/reducer/orders/constants";

const defaultOrdersState: OrdersState = {
  data: [],
  status: ACTION_STATUSES.INITIAL,
};

const ordersDataActions = handleActions(
  {
    [ORDERS_ACTIONS.SET_ORDERS]: (_state: TOrders, action: AnyAction) => {
      return action.payload;
    },
    [ORDERS_ACTIONS.SET_ORDER]: (_state: TOrders | null, action: AnyAction) => {
      const a = action as AnyAction;
      const { payload } = a;
      const newOrdersArray: TOrders = [...(_state || [])];

      newOrdersArray.push(payload.order);

      return newOrdersArray;
    },
  },
  defaultOrdersState.data
);

const statusActions = handleActions(
  {
    [ORDERS_ACTIONS.SET_ORDERS_STATUS]: (
      _state: TActionStatus,
      action: AnyAction
    ) => {
      return action.payload;
    },
  },
  defaultOrdersState.status
);

const reducer: Reducer<OrdersState, any> = combineReducers({
  data: ordersDataActions,
  status: statusActions,
});

export default reducer;
