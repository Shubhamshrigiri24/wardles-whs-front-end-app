import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import OrdersAPI from "utils/api/OrdersAPI";
import { ACTION_STATUSES, TActionStatus, AppActions } from "app/store/types";
import {
  TOrder,
  TOrders,
  SetOrdersDataActionType,
  SetOrderDataByIdActionType,
  SetOrdersStatusActionType,
} from "app/store/reducer/orders/types";
import { ORDERS_ACTIONS } from "app/store/reducer/orders/constants";
import { transformOrder } from "./helpers";

export const setOrdersData = (orders: TOrders): SetOrdersDataActionType => ({
  type: ORDERS_ACTIONS.SET_ORDERS,
  payload: orders,
});

export const setOrderDataById = (
  id: number,
  order: TOrder
): SetOrderDataByIdActionType => ({
  type: ORDERS_ACTIONS.SET_ORDER,
  payload: { id, order },
});

export const setOrdersStatus = (
  status: TActionStatus
): SetOrdersStatusActionType => ({
  type: ORDERS_ACTIONS.SET_ORDERS_STATUS,
  payload: status,
});

export const getOrderById =
  (id: number) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setOrdersStatus(ACTION_STATUSES.PENDING));

    try {
      const order: AxiosResponse = await OrdersAPI.getOrder(id);

      const ordersData = transformOrder(order.data);

      dispatch(setOrderDataById(id, ordersData));
      dispatch(setOrdersStatus(ACTION_STATUSES.LOADED));
    } catch (e) {
      console.warn(e);
      dispatch(setOrdersStatus(ACTION_STATUSES.FAILED));
    }
  };

export const getOrders = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(setOrdersStatus(ACTION_STATUSES.PENDING));

  try {
    const orders = (await OrdersAPI.getOrders()) as AxiosResponse;
    const ordersData = orders.data.orders.map(transformOrder);

    dispatch(setOrdersData(ordersData));
    dispatch(setOrdersStatus(ACTION_STATUSES.LOADED));
  } catch (e) {
    console.warn(e);
    dispatch(setOrdersStatus(ACTION_STATUSES.FAILED));
  }
};
