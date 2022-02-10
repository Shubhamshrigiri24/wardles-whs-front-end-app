import { TOrder } from "app/store/reducer/orders/types";
import { productsImageURIMap } from "utils/api/helpers";

export const addImagesToOrderProductsMeta = (order: TOrder) => {
  order.products.forEach((entry) => {
    entry.product.productInfo.imageURI =
      productsImageURIMap[entry.product.productInfo.imageURI];
  });
};

export const transformOrder = (orderObj: TOrder) => {
  //this is provisory until the images are hosted on server side
  addImagesToOrderProductsMeta(orderObj);

  const product = orderObj.products[0].product;

  return {
    ...orderObj,
    type: "order",
    typeLabel: "Individual order",
    title: product.productInfo.productName,
    content: [
      {
        label: "Created Date",
        value: orderObj.createdDate,
      },
      {
        label: "Quantity",
        value: `${product.meta.strength}mg ${product.itemsPerPack} tablets`,
      },

      { label: "Order number", value: `#${orderObj.id}` },
    ],
  };
};
