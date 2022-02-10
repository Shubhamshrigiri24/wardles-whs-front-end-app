import ApiHandler from "./ApiHandler";

import { BRAINTREE_ROUTES } from "./const";

const BraintreeAPI = {
  getToken: () => ApiHandler.get({ url: BRAINTREE_ROUTES.token() }),
};

export default BraintreeAPI;
