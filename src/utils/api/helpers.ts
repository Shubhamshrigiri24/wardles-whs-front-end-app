import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import sildenafilSrc from "pages/OrderProductSelectionPage/assets/sildenafil.png";
import viagraSrc from "pages/OrderProductSelectionPage/assets/viagra.png";
import cialisSrc from "pages/OrderProductSelectionPage/assets/cialis-10mg.png";
import tadalafilSrc from "pages/OrderProductSelectionPage/assets/tadalafil-10mg.png";

export const productsImageURIMap: Record<string, string> = {
  sildenafil: sildenafilSrc,
  viagra: viagraSrc,
  tadalafil: tadalafilSrc,
  cialis: cialisSrc,
};

export const addImagesToProducts = (products: Array<PriceConfig>) => {
  return products.map((product) => ({
    ...product,
    __meta__: {
      ...product.__meta__,
      imageURI: productsImageURIMap[product.__meta__.imageURI],
    },
  }));
};
