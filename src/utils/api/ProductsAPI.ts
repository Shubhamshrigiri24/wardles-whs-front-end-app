import ApiHandler from "./ApiHandler";

import { PRODUCTS_ROUTES } from "./const";

const ProductsApi = {
  getProducts: () => ApiHandler.get({ url: PRODUCTS_ROUTES.base() }),
};
export default ProductsApi;
