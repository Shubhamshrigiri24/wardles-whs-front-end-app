import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";
import { Discount } from "app/store/reducer/order/types";

export type OrderDetailProductInfo = {
  id: string;
  productName: string;
  activeIngredient: string;
  imageURI: string;
  worksIn: string;
  duration: string;
  isBestValue: boolean;
  canBuy: boolean;
  description: string;
  moreInfo: {
    title: string;
    content: string;
  }[];
  subscriptionMoreInfo?: string;
  levels: {
    levelLabel: string;
    columnLabelTemplate: string;
    pricePerUnitTemplate?: string;
    shouldDeriveBestValue?: boolean;
    stealPriceFromSelectedChild?: boolean;
    renderOrder: number;
  }[];
  priceTemplate: string;
  buyLinkURITemplate: string;
  startConsultationLinkURI: string;
};

export type OrderPricingType = Discount & {
  delivery?: { code: "PREMIUM" | "FREE"; value: number };
};

export type OrderDetailsProduct = {
  name: string;
  sku: string;
  label: string;
  itemsPerPack: number;
  price: number;
  pricePerUnit: number;
  isBestValue: boolean;
  meta: Record<string, any>;
  productInfo: OrderDetailProductInfo;
};

export type Subscription = {
  startDate: string;
  renewalDate: string;
  nextShipment: string;
  status: typeof SUBSCRIPTION_STATUSES;
};

export type Payment = {
  cardNumber: string;
  hasError: boolean;
};

export type Delivery = {
  firstName: string;
  lastName: string;
  postcode: string;
  addressline1: string;
  addressline2: string;
  city: string;
  email: string;
  phone: string;
  product: any;
  pricing: OrderPricingType;
  shouldShowDeliveryInfo?: boolean;
};

export enum OrderType {
  SUBSCRIPTION = "subscription",
  INDIVIDUAL_ORDER = "order",
}

export enum ConfirmationState {
  INITIAL = "initial",
  CONFIRMED = "confirmed",
}
