import { addImagesToOrderProductsMeta } from "../orders/helpers";
import { TSubscription } from "./types";
import { SUBSCRIPTION_STATUSES } from "./constants";

export const transformSubscription = (subscriptionObject: TSubscription) => {
  //this is provisory until the images are hosted on server side
  addImagesToOrderProductsMeta(subscriptionObject);
  const product = subscriptionObject.products[0].product;
  const isCancelled = subscriptionObject?.status === "CANCELLED";

  return {
    ...subscriptionObject,
    type: "subscription",
    typeLabel: "Subscription",
    title: product.productInfo.productName,
    status:
      (SUBSCRIPTION_STATUSES[
        subscriptionObject.status
      ] as keyof typeof SUBSCRIPTION_STATUSES) || subscriptionObject.status,
    content: [
      {
        label: "Start Date",
        value: subscriptionObject.createdDate,
      },
      {
        label: "Renewal Date",
        value: isCancelled
          ? "No Date Available"
          : subscriptionObject.nextOrderDate,
      },
      {
        label: "Status",
        value: SUBSCRIPTION_STATUSES[subscriptionObject.status],
        valueHighlight: subscriptionObject.status === "CANCELLED",
      },
      {
        label: "Quantity",
        value: `${product.meta.strength}mg ${product.itemsPerPack} tablets`,
      },
    ],
  };
};
