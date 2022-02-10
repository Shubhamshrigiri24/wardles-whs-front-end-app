import { Dispatch } from "redux";
import { AxiosResponse } from "axios";
import AccountsAPI from "utils/api/AccountsAPI";
import { ACTION_STATUSES, TActionStatus, AppActions } from "app/store/types";
import { ACCOUNT_ACTIONS } from "app/store/reducer/account/constants";
import {
  TAccount,
  SetAccountDataActionType,
  SetAccountStatusActionType,
} from "app/store/reducer/account/types";

export const SetAccountData = (
  account: TAccount
): SetAccountDataActionType => ({
  type: ACCOUNT_ACTIONS.SET_ACCOUNT,
  payload: account,
});

export const SetAccountStatus = (
  status: TActionStatus
): SetAccountStatusActionType => ({
  type: ACCOUNT_ACTIONS.SET_ACCOUNT_STATUS,
  payload: status,
});

export const getAccount = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(SetAccountStatus(ACTION_STATUSES.PENDING));

  try {
    const account = (await AccountsAPI.getAccount()) as AxiosResponse;

    const accountData = await account.data;

    dispatch(SetAccountData(accountData));
    dispatch(SetAccountStatus(ACTION_STATUSES.LOADED));
  } catch (e) {
    console.warn(e);
    dispatch(SetAccountStatus(ACTION_STATUSES.FAILED));
  }
};
