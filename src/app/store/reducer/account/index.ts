import { handleActions } from "redux-actions";
import { AnyAction, combineReducers } from "redux";

import { ACTION_STATUSES, TActionStatus } from "app/store/types";

import { State as AccountState, TAccount, AccountActionTypes } from "./types";
import { ACCOUNT_ACTIONS } from "app/store/reducer/account/constants";

const defaultAccountState: AccountState = {
  data: null,
  status: ACTION_STATUSES.INITIAL,
};

const customerActions = handleActions(
  {
    [ACCOUNT_ACTIONS.SET_ACCOUNT]: (
      _state: TAccount | null,
      action: AccountActionTypes
    ) => {
      const a = action as AnyAction;
      const { payload } = a;

      return payload;
    },
  },
  defaultAccountState.data
);

const statusActions = handleActions(
  {
    [ACCOUNT_ACTIONS.SET_ACCOUNT_STATUS]: (
      _state: TActionStatus,
      action: AccountActionTypes
    ) => {
      const a = action as AnyAction;
      const { payload } = a;

      return payload;
    },
  },
  defaultAccountState.status
);

const reducer = combineReducers({
  data: customerActions,
  status: statusActions,
});

export default reducer;
