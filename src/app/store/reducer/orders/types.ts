import { TActionStatus } from "app/store/types";
import { ORDERS_ACTIONS } from "app/store/reducer/orders/constants";
import { OrderDetailProductInfo } from "pages/OnlineServicesOrderDetailsPage/types";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";

export type TOrder = {
  id: string;
  status: keyof typeof SUBSCRIPTION_STATUSES;
  customer: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    shippingAddress: {
      line1: string;
      line2: string;
      city: string;
      postcode: string;
    };
  };
  chargeId: string;
  shipstationOrderId: number;
  products: {
    sku: string;
    quantity: number;
    product: {
      name: string;
      sku: string;
      label: string;
      itemsPerPack: number;
      price: number;
      pricePerUnit: number;
      isBestValue: boolean;
      subscription: boolean;
      meta: {
        strength: string;
      };
      productInfo: OrderDetailProductInfo;
    };
  }[];
  editor: {
    id: string;
    editor: string;
  };
  lastEvent: string;
  createdDate: string;
  subscriptionId: string;
  price: {
    initial: number;
    discountValue: number;
    final: number;
    discounts: {
      code: string;
      type: "percentage" | "fixed";
      amount: number;
      calculated: {
        initial: number;
        value: number;
        final: number;
      };
    }[];
  };
  paymentMethodDetails: {
    last4: string;
  };
  type: string;
  typeLabel: string;
  title: string;
  content: {
    label: string;
    value: string;
  }[];
};

export type TOrders = TOrder[];

export type State = {
  data: TOrders | [];
  status: TActionStatus;
};

export type SetOrdersDataActionType = {
  type: typeof ORDERS_ACTIONS.SET_ORDERS;
  payload: TOrders;
};

export type SetOrderDataByIdActionType = {
  type: typeof ORDERS_ACTIONS.SET_ORDER;
  payload: { id: number; order: TOrder };
};

export type SetOrdersStatusActionType = {
  type: typeof ORDERS_ACTIONS.SET_ORDERS_STATUS;
  payload: TActionStatus;
};

export type OrdersActionsTypes =
  | SetOrdersDataActionType
  | SetOrderDataByIdActionType
  | SetOrdersStatusActionType;
