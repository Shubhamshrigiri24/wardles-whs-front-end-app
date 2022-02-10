import { RootState } from "app/store/types";

export const getSubscriptionsData = (state: RootState) =>
  state?.subscriptions?.data || [];

export const getSubscriptionsStatus = (state: RootState) =>
  state?.subscriptions?.status;

export const getSubscriptionById = (state: RootState, id: string) =>
  getSubscriptionsData(state).find((sub) => sub.id === id);
