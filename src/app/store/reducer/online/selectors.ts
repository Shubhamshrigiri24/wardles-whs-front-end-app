import {
  Product,
  State,
  Pack,
  defaultPack,
  OnlineService,
  defaultOnlineService,
  defaultProduct,
  OnlineQuestion,
} from "./types";

export function getProducts(state: State | null): Product[] {
  return state?.products ?? [];
}

export function getProductToken(state: State | null): string | null {
  return state?.productToken ?? null;
}

export function getProductTokenValid(state: State | null): boolean {
  return state?.productTokenValid ?? true;
}

export function getSelectedService(state: State | null): OnlineService {
  return state?.selectedOnlineService ?? defaultOnlineService;
}

export function getOnlineServices(state: State): OnlineService[] {
  return state.onlineServices;
}

export function getSelectedProduct(state: State | null): Product {
  return state?.selectedProduct ?? defaultProduct;
}

export function getSelectedPack(state: State | null): Pack {
  return state?.selectedPack ?? defaultPack;
}

export function getProductsFetching(state: State): boolean {
  return state.fetching;
}

export function getBraintreeToken(state: State): string {
  return state.braintreeToken;
}

export function getSuccessfulOrder(state: State): boolean {
  return state.successfulOrder;
}

export function getOrderErrorMessage(state: State): string {
  return state.orderErrorMessage;
}

export function getConsultationResponses(state: State): OnlineQuestion[] {
  return state.consultation.responses;
}

export function getIsConsultationValidForOrder(state: State): boolean {
  return state.consultation.isValidForOrder;
}

export function getOrderNumber(state: State): string {
  return state.orderNumber;
}
