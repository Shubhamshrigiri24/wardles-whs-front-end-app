import ApiHandler from "./ApiHandler";

import { DISCOUNTS_ROUTES } from "./const";

export type ValidationRequestBody = {
  basket: [
    {
      sku?: string;
      quantity?: number;
    }
  ];
  discountCodes?: string[];
  subscription?: boolean;
};

const DiscountsAPI = {
  validateCode: (body: ValidationRequestBody) =>
    ApiHandler.post({ url: DISCOUNTS_ROUTES.validate(), body }),
};

export default DiscountsAPI;
