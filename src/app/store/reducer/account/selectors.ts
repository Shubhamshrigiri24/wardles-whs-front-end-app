import { RootState } from "app/store/types";

export const getAccountData = (state: RootState) => state?.account?.data;
export const getAccountStatus = (state: RootState) => state?.account?.status;
