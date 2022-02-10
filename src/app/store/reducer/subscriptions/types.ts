import { TActionStatus } from "app/store/types";
import { TOrder } from "app/store/reducer/orders/types";
import { SUBSCRIPTIONS_ACTIONS } from "app/store/reducer/subscriptions/constants";

export type TSubscription = TOrder & {
  nextOrderDate: string;
  createdDate: string;
  totalCost: string;
  order: TOrder;
};

export type TSubscriptions = TSubscription[];

export type State = {
  data: TSubscriptions | [];
  status: TActionStatus;
};

export type SetSubscriptionsDataActionType = {
  type: typeof SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS;
  payload: TSubscriptions;
};

export type SetSubscriptionDataByIdActionType = {
  type: typeof SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTION;
  payload: { id: string; subscription: TSubscription };
};

export type SetSubscriptionsStatusActionType = {
  type: typeof SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS_STATUS;
  payload: TActionStatus;
};

export type SubscriptionsActionTypes =
  | SetSubscriptionsDataActionType
  | SetSubscriptionDataByIdActionType
  | SetSubscriptionsStatusActionType;
