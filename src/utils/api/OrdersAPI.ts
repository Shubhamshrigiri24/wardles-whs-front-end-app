import ApiHandler from "./ApiHandler";
import { TOrder } from "app/store/reducer/orders/types";
import { ORDERS_ROUTES } from "./const";

const OrdersAPI = {
  getOrders: () => ApiHandler.get({ url: ORDERS_ROUTES.base() }),
  getOrder: (id: number) => ApiHandler.get({ url: ORDERS_ROUTES.byId(id) }),
  createOrder: (order: TOrder) =>
    ApiHandler.post({ url: ORDERS_ROUTES.createOrder(), body: order }),
};

export default OrdersAPI;
