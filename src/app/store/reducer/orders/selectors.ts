import { RootState } from "app/store/types";

export const getOrdersData = (state: RootState) => state?.orders?.data || [];

export const getOrdersStatus = (state: RootState) => state?.orders?.status;

export const getOrderById = (state: RootState, id: string) =>
  getOrdersData(state).find((order) => order.id === id);
