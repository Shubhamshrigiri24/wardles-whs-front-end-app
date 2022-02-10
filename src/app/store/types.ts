import { State as CheckoutState } from "./reducer/checkout/types";
import { State as OnlineService } from "./reducer/online/types";
import { State as OrderState, OrderActionTypes } from "./reducer/order/types";
import {
  State as AccountState,
  AccountActionTypes,
} from "./reducer/account/types";
import {
  State as SubscriptionsState,
  SubscriptionsActionTypes,
} from "./reducer/subscriptions/types";
import {
  State as OrdersState,
  OrdersActionsTypes,
} from "./reducer/orders/types";

export interface RootState {
  checkout: CheckoutState;
  location: Location | null;
  online: OnlineService;
  order: OrderState;
  account: AccountState;
  subscriptions: SubscriptionsState;
  orders: OrdersState;
}

export type TActionStatus = "LOADED" | "PENDING" | "FAILED" | "INITIAL";

export const ACTION_STATUSES = {
  LOADED: "LOADED" as TActionStatus,
  PENDING: "PENDING" as TActionStatus,
  FAILED: "FAILED" as TActionStatus,
  INITIAL: "INITIAL" as TActionStatus,
};

export type AppActions =
  | AccountActionTypes
  | OrderActionTypes
  | OrdersActionsTypes
  | SubscriptionsActionTypes;
