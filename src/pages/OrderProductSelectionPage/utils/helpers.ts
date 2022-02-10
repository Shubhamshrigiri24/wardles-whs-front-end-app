import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { PRODUCT_CONSTANTS } from "constants/product";

export const findProductAndChoiceBySKU = (
  sku: string,
  productsMap: PriceConfig[],
  isLookingForSubscriptions: boolean
) => {
  let foundProduct: PriceConfig = productsMap[0];
  let selectedPack: any = {};

  productsMap.forEach((product: PriceConfig) => {
    const checkSKUorGoBelow = (levelOrLeaf: any, pastKey: string) => {
      if (levelOrLeaf.hasOwnProperty("sku")) {
        if (levelOrLeaf.sku === sku) {
          const [strength, orderType, itemsPerPack] = pastKey?.split("|");

          foundProduct = product;
          selectedPack = { ...levelOrLeaf, strength, orderType, itemsPerPack };
        }
        return;
      } else {
        Object.entries(levelOrLeaf).forEach(([key, value]) => {
          if (
            (isLookingForSubscriptions &&
              key === PRODUCT_CONSTANTS.noSubscription) ||
            (!isLookingForSubscriptions &&
              key === PRODUCT_CONSTANTS.subscription)
          )
            return;
          return checkSKUorGoBelow(value, pastKey + "|" + key);
        });
      }
    };

    Object.entries(product.priceTree).forEach(([key, value]) =>
      checkSKUorGoBelow(value, key)
    );
  });

  return { ...foundProduct, selectedPack };
};
