import { ORDER_ACTIONS } from "app/store/reducer/order/constants";
import {
  OrderProduct,
  OrderCustomer,
  SetCustomerActionType,
  SetProductActionType,
  CleanupOrderFlowStateActionType,
} from "app/store/reducer/order/types";

export const SetCustomerAction = (
  customer: OrderCustomer
): SetCustomerActionType => ({
  type: ORDER_ACTIONS.SET_CUSTOMER,
  payload: customer,
});

export const SetProductAction = (
  product: OrderProduct
): SetProductActionType => ({
  type: ORDER_ACTIONS.SET_PRODUCT,
  payload: product,
});

export const CleanupOrderFlowState = (): CleanupOrderFlowStateActionType => ({
  type: ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE,
});
