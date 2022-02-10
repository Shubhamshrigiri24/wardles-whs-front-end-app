import { getCostStr } from "utils/utils";
import { OrderCustomerDetails } from "../../app/store/reducer/order/types";

export const formatOrder = (
  paymentNonce: string,
  product: any,
  selectedPack: any,
  customerDetails: any,
  consultation: any,
  email: string,
  paymentMethodDetails: Record<string, any>,
  discountCodes: string[]
) => {
  return {
    subscription: !!product.subscription,
    paymentNonce: paymentNonce,
    email: email || customerDetails.email,
    firstName: customerDetails.firstName,
    lastName: customerDetails.lastName,
    phone: customerDetails.phone,
    productSku: selectedPack?.sku,
    address: {
      line1: customerDetails.addressLine1,
      line2: customerDetails.addressLine2,
      city: customerDetails.city,
      postcode: customerDetails.postcode,
    },
    shippingAddress: {
      line1: customerDetails.addressLine1,
      line2: customerDetails.addressLine2,
      city: customerDetails.city,
      postcode: customerDetails.postcode,
    },
    basket: [
      {
        sku: selectedPack?.sku,
        quantity: 1,
      },
    ],
    consultation: consultation,
    paymentMethodDetails,
    discountCodes,
    delivery: selectedPack?.delivery?.type ?? "FREE",
  };
};

export const formatThreeDS = (
  selectedPack: any,
  customerDetails: Partial<OrderCustomerDetails>
) => ({
  amount: getCostStr(
    (selectedPack.price ?? 0) + (selectedPack.delivery?.price ?? 0)
  ),
  mobilePhoneNumber: customerDetails?.phone,
  email: customerDetails?.email,
  billingAddress: {
    givenName: customerDetails?.firstName,
    surname: customerDetails?.lastName,
    phoneNumber: customerDetails?.phone,
    streetAddress: customerDetails?.addressLine1,
    extendedAddress: customerDetails?.addressLine2,
    locality: customerDetails?.city,
    postalCode: customerDetails?.postcode,
    countryCodeAlpha2: "GB",
  },
});
