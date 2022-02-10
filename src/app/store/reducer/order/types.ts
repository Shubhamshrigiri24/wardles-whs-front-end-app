import { Pack as OnlinePack, Product as OnlineProduct } from "../online/types";
import { ORDER_ACTIONS } from "app/store/reducer/order/constants";

// Easy enough passthrough for props. When needed, we can break this off.

export type Pack = OnlinePack;

export type PackDiscount = {
  code: string;
  type: "percentage" | "fixed";
  discountInfo: number;
  discountAmount: number;
  priceWithDiscount: number;
};

export type Discount = {
  initial: number;
  discountValue: number;
  final: number;
  discounts?: null | Array<{
    code: string;
    type: PackDiscount["type"];
    amount: number;
    calculated: {
      initial: number;
      value: number;
      final: number;
    };
  }>;
};

export type Product = OnlineProduct & {
  subscription?: boolean;
  image?: string;
  delivery?: string;
  orderId?: string;
  subscriptionId?: string;
};

export type OrderCustomer = {
  customerType: string;
  customerDetails: null | OrderCustomerDetails;
};

export type OrderProduct = Product | null;

export interface OrderCustomerDetails {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
  dob?: string;
  gpDetails?: string;
  agreeMarketing: boolean;
}

export type State = {
  customer: OrderCustomer;
  product: OrderProduct;
};

export type TOrder = State;

export type SetCustomerActionType = {
  type: typeof ORDER_ACTIONS.SET_CUSTOMER;
  payload: OrderCustomer;
};

export type SetProductActionType = {
  type: typeof ORDER_ACTIONS.SET_PRODUCT;
  payload: OrderProduct;
};

export type CleanupOrderFlowStateActionType = {
  type: typeof ORDER_ACTIONS.CLEANUP_ORDER_FLOW_STATE;
};

export type OrderActionTypes =
  | SetCustomerActionType
  | SetProductActionType
  | CleanupOrderFlowStateActionType;
