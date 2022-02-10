import ApiHandler from "./ApiHandler";

import { ACCOUNT_ROUTES } from "./const";

const AccountsAPI = {
  getAccount: () =>
    ApiHandler.get({
      url: ACCOUNT_ROUTES.base(),
      credentials: "include",
    }),
  createAccount: (account: Object) =>
    ApiHandler.post({
      url: `${ACCOUNT_ROUTES.base()}/register`,
      credentials: "include",
      body: account,
    }),
};

export default AccountsAPI;
