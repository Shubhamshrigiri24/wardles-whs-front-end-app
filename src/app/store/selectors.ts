import { RootState } from "./types";
import { CustomerDetails, DeliveryDetails } from "./reducer/checkout/types";
import { PostcodeLookupAddress } from "./reducer/shared";
import * as checkout from "./reducer/checkout/selectors";
import {
  Product,
  Pack,
  OnlineService,
  OnlineQuestion,
  OnlineServiceIds,
} from "./reducer/online/types";
import * as online from "./reducer/online/selectors";

export function getCustomerDetails(state: RootState): CustomerDetails {
  return checkout.getCustomerDetails(state.checkout);
}

export function getBraintreeToken(state: RootState): string {
  return checkout.getBraintreeToken(state.checkout);
}

export function getConfirmedPayment(state: RootState): boolean {
  return checkout.getConfirmedPayment(state.checkout);
}

export function getPaymentErrorMessage(state: RootState): string {
  return checkout.getPaymentErrorMessage(state.checkout);
}

export function getDeliveryDetails(state: RootState): DeliveryDetails {
  return checkout.getDeliveryDetails(state.checkout);
}

export function getPostCodeLookUpAddresses(
  state: RootState
): PostcodeLookupAddress[] {
  return checkout.getPostCodeLookUpAddresses(state.checkout);
}

export function getSelectedOnlineService(state: RootState): OnlineService {
  return online.getSelectedService(state.online);
}

export function getOnlineServices(state: RootState): OnlineService[] {
  return online.getOnlineServices(state.online);
}

export function getSelectedProduct(state: RootState): Product {
  return online.getSelectedProduct(state.online);
}

export function getSelectedPack(state: RootState): Pack {
  return online.getSelectedPack(state.online);
}

export function getProducts(state: RootState): Product[] {
  return online.getProducts(state.online);
}

export function getProductToken(state: RootState): string | null {
  return online.getProductToken(state.online);
}

export function getProductTokenValid(state: RootState): boolean {
  return online.getProductTokenValid(state.online);
}

export function getProductsFetching(state: RootState): boolean {
  return online.getProductsFetching(state.online);
}

export function getOnlineBraintreeToken(state: RootState): string {
  return online.getBraintreeToken(state.online);
}

export function getOnlineSuccessfulOrder(state: RootState): boolean {
  return online.getSuccessfulOrder(state.online);
}

export function getOnlineOrderErrorMessage(state: RootState): string {
  return online.getOrderErrorMessage(state.online);
}

export function getOnlineConsultation(state: RootState): OnlineQuestion[] {
  return online.getConsultationResponses(state.online);
}

export function getOnlineIsConsultationValidForOrder(
  state: RootState
): boolean {
  return online.getIsConsultationValidForOrder(state.online);
}

export function getOnlineOrderNumber(state: RootState): string {
  return online.getOrderNumber(state.online);
}

const hanaAliases = {
  usingHormonalContraception: "Currently using hormonal contraception? Yes",
  usingDesogestrel: "Current contraceptive: Desogestrel",
  age: "How old are you?",
  previouslyUsedDesogestrel: "Previously had desogestrel? Yes",
};

export function makeGetEligiblePacks(
  state: RootState
): (product: Product) => Pack[] {
  const consultation = online.getConsultationResponses(state.online);
  return (product) =>
    product.packs.filter((pack) => {
      switch (true) {
        case product.service === OnlineServiceIds.hana &&
          ["HN539979", "HN539980", "HN539981"].includes(pack.sku):
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const usingHormonalContraception =
            consultation
              .find(
                (response) =>
                  response.question === hanaAliases.usingHormonalContraception
              )
              ?.answer.toLowerCase() === "true";
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const usingDesogestrel =
            consultation
              .find(
                (response) => response.question === hanaAliases.usingDesogestrel
              )
              ?.answer.toLowerCase() === "true";
          const age = parseFloat(
            consultation.find(
              (response) => response.question === hanaAliases.age
            )?.answer ?? ""
          );
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const previouslyUsedDesogestrel =
            consultation
              .find(
                (response) =>
                  response.question === hanaAliases.previouslyUsedDesogestrel
              )
              ?.answer.toLowerCase() === "true";

          return (
            usingHormonalContraception &&
            usingDesogestrel &&
            age >= 18 &&
            previouslyUsedDesogestrel
          );
        default:
          return true;
      }
    });
}
