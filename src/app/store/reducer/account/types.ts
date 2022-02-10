import { TActionStatus } from "app/store/types";
import { ACCOUNT_ACTIONS } from "app/store/reducer/account/constants";

export type TAccount = {
  dob: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  phone: string;
  updateTime: string;
  userId: string;
  addressline1: string;
  addressline2: string;
  agreeMarketing: boolean;
  city: string;
  gpDetails: string;
  postcode: string;
};

export type State = {
  data: TAccount | null;
  status: TActionStatus;
};

export type SetAccountDataActionType = {
  type: typeof ACCOUNT_ACTIONS.SET_ACCOUNT;
  payload: TAccount;
};

export type SetAccountStatusActionType = {
  type: typeof ACCOUNT_ACTIONS.SET_ACCOUNT_STATUS;
  payload: TActionStatus;
};

export type AccountActionTypes =
  | SetAccountDataActionType
  | SetAccountStatusActionType;
