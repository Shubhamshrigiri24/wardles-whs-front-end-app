import ApiHandler from "./ApiHandler";

import { TOrder } from "app/store/reducer/order/types";

import { SUBSCRIPTIONS_ROUTES } from "./const";

type TChange = {
  id: string;
  changes: object;
};

export type UpdateSubscriptionHealthStatusPayload = {
  subscriptionId: string;
  details?: string;
};

const SubscriptionsApi = {
  getSubscriptions: () => ApiHandler.get({ url: SUBSCRIPTIONS_ROUTES.base() }),
  getSubscription: (id: string) =>
    ApiHandler.get({ url: SUBSCRIPTIONS_ROUTES.byId(id) }),
  createSubscription: (order: TOrder) =>
    ApiHandler.post({ url: SUBSCRIPTIONS_ROUTES.base(), body: order }),
  cancelSubscription: (id: string) =>
    ApiHandler.delete({ url: SUBSCRIPTIONS_ROUTES.byId(id) }),
  modifySubscription: (props: TChange) => {
    const { id, changes } = props;

    ApiHandler.patch({ url: SUBSCRIPTIONS_ROUTES.byId(id), body: changes });
  },
  updateSubscriptionHealthStatus: (
    payload: UpdateSubscriptionHealthStatusPayload
  ) =>
    ApiHandler.post({
      url: SUBSCRIPTIONS_ROUTES.healthStatus(),
      body: payload,
    }),
  updateSubscriptionPayment: (id: string, payload: Record<string, any>) =>
    ApiHandler.patch({
      url: SUBSCRIPTIONS_ROUTES.updatePayment(id),
      body: payload,
    }),
};

export default SubscriptionsApi;
