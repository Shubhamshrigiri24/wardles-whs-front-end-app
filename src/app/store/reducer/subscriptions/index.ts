import { handleActions } from "redux-actions";
import { AnyAction, combineReducers } from "redux";

import { ACTION_STATUSES, TActionStatus } from "app/store/types";
import { SUBSCRIPTIONS_ACTIONS } from "app/store/reducer/subscriptions/constants";
import {
  State as SubscriptionsState,
  TSubscription,
  TSubscriptions,
} from "./types";

const defaultSubscriptionsState: SubscriptionsState = {
  data: [],
  status: ACTION_STATUSES.INITIAL,
};

const subscriptionsDataActions = handleActions(
  {
    [SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS]: (
      _state: TSubscriptions | null,
      action: AnyAction
    ) => {
      const a = action as AnyAction;
      const { payload } = a;

      return payload;
    },
    [SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTION]: (
      _state: TSubscriptions | null,
      action: AnyAction
    ) => {
      const a = action as AnyAction;
      const { payload } = a;
      const initialSubscriptionsArray: TSubscriptions = [...(_state || [])];

      const isSubscriptionAlreadyPresent = !!initialSubscriptionsArray.find(
        (subscription: TSubscription) => subscription.id === payload.id
      );

      const newSubscriptionsArray = isSubscriptionAlreadyPresent
        ? initialSubscriptionsArray.map((subscription: TSubscription) =>
            subscription.id === payload.id ? payload.subscription : subscription
          )
        : [...initialSubscriptionsArray, payload.subscription];

      return newSubscriptionsArray;
    },
  },
  defaultSubscriptionsState.data
);

const statusActions = handleActions(
  {
    [SUBSCRIPTIONS_ACTIONS.SET_SUBSCRIPTIONS_STATUS]: (
      _state: TActionStatus,
      action: AnyAction
    ) => {
      const a = action as AnyAction;
      const { payload } = a;

      return payload;
    },
  },
  defaultSubscriptionsState.status
);

const reducer = combineReducers({
  data: subscriptionsDataActions,
  status: statusActions,
});

export default reducer;
