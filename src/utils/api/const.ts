export const BASE_URL = process.env.REACT_APP_BASE_API;

export const SUBSCRIPTIONS_ROUTES = {
  base: () => `${BASE_URL}/services/online/subscriptions`,
  byId: (id: string) => `${SUBSCRIPTIONS_ROUTES.base()}/${id}`,
  healthStatus: () => `${BASE_URL}/services/online/healthstatus`,
  updatePayment: (id: string) =>
    `${BASE_URL}/services/online/subscriptions/${id}/paymentmethod`,
};

export const ORDERS_ROUTES = {
  base: () => `${BASE_URL}/services/online/orders`,
  createOrder: () => `${BASE_URL}/services/online/order`,
  byId: (id: number) => `${ORDERS_ROUTES.base()}/${id}`,
};

export const ACCOUNT_ROUTES = {
  base: () => `${BASE_URL}/services/online/customers`,
};

export const BRAINTREE_ROUTES = {
  token: () => `${BASE_URL}/services/paymenttoken`,
};

export const ADDRESS_ROUTES = {
  postcode: (postcode: string) => `${BASE_URL}/postcodes/${postcode}/addresses`,
  gp: (query: string) =>
    `https://api.well.co.uk/gp-profiles/practices?q=${query}`,
};

export const PRODUCTS_ROUTES = {
  base: () => `${BASE_URL}/services/online/ed/products`,
};

export const DISCOUNTS_ROUTES = {
  base: () => `${BASE_URL}/services/online/ed/orders`,
  validate: () => `${DISCOUNTS_ROUTES.base()}/validate`,
};

export const CONSULTATION_ROUTES = {
  base: () => `${BASE_URL}/services/online/consultation`,
  referral: () => `${CONSULTATION_ROUTES.base()}/referral`,
  validate: () => `${CONSULTATION_ROUTES.base()}/validate`,
};
