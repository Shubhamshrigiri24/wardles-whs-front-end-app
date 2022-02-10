import ApiHandler from "./ApiHandler";

import { ADDRESS_ROUTES } from "./const";

const AddressAPI = {
  getAddressByPostcode: (code: string) =>
    ApiHandler.get({
      url: ADDRESS_ROUTES.postcode(code),
      credentials: "omit",
    }),
  getAddressByGP: (query: string) =>
    ApiHandler.get({
      url: ADDRESS_ROUTES.gp(query),
      credentials: "include",
    }),
};

export default AddressAPI;
