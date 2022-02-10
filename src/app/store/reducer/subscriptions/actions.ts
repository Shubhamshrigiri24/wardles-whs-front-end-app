import { AxiosResponse } from "axios";
import SubscriptionsAPI, {
  UpdateSubscriptionHealthStatusPayload,
} from "utils/api/SubscriptionsAPI";
import { Dispatch } from "redux";
import { ACTION_STATUSES, TActionStatus, AppActions } from "app/store/types";
import {
  TSubscriptions,
  TSubscription,
  SetSubscriptionsDataActionType,
  SetSubscriptionDataByIdActionType,
  SetSubscriptionsStatusActionType,
} from "app/store/reducer/subscriptions/types";
import { SUBSCRIPTIONS_ACTIONS } from "app/store/reducer/subscriptions/constants";
import { transformSubscription } from "./helpers";

export const setSubscriptionsData = (
  subscriptions: TSubscriptions
): SetSubscriptionsDataActionType => ({
  type: SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS,
  payload: subscriptions,
});

export const setSubscriptionDataById = (
  id: string,
  subscription: TSubscription
): SetSubscriptionDataByIdActionType => ({
  type: SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTION,
  payload: { id, subscription },
});

export const setSubscriptionsStatus = (
  status: TActionStatus
): SetSubscriptionsStatusActionType => ({
  type: SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS_STATUS,
  payload: status,
});

export type TAny = (payload?: any) => any;

export const getSubscriptions =
  () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setSubscriptionsStatus(ACTION_STATUSES.PENDING));

    try {
      const subscriptions =
        (await SubscriptionsAPI.getSubscriptions()) as AxiosResponse;

      const subscriptionsData = await subscriptions.data.subscriptions;

      const mappedSubscriptions = subscriptionsData.map(transformSubscription);
      dispatch(setSubscriptionsData(mappedSubscriptions));
      dispatch(setSubscriptionsStatus(ACTION_STATUSES.LOADED));
    } catch (e) {
      console.warn(e);
      dispatch(setSubscriptionsStatus(ACTION_STATUSES.FAILED));
    }
  };

export const getSubscriptionById =
  (id: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setSubscriptionsStatus(ACTION_STATUSES.PENDING));

    try {
      const subscription = (await SubscriptionsAPI.getSubscription(
        id
      )) as AxiosResponse;

      const subscriptionData = await subscription.data;

      const mappedSubscription = transformSubscription(subscriptionData);
      dispatch(setSubscriptionDataById(id, mappedSubscription));
      dispatch(setSubscriptionsStatus(ACTION_STATUSES.LOADED));
    } catch (e) {
      console.warn(e);
      dispatch(setSubscriptionsStatus(ACTION_STATUSES.FAILED));
    }
  };

export const updateSubscriptionHealthStatus: TAny =
  (payload: UpdateSubscriptionHealthStatusPayload) => async () => {
    const response = (await SubscriptionsAPI.updateSubscriptionHealthStatus(
      payload
    )) as AxiosResponse;
    return response;
  };
