import { RootState } from "app/store/types";

export const getOrderState = (state: RootState) => state?.order;

export const getProduct = (state: RootState) => getOrderState(state).product;
export const getCustomer = (state: RootState) => getOrderState(state).customer;
