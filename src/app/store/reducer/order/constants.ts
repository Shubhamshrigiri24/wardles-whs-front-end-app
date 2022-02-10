export const ORDER_ACTIONS = {
  SET_CUSTOMER: "SET_CUSTOMER",
  SET_PRODUCT: "SET_PRODUCT",
  SET_PAYMENT: "SET_PAYMENT",
  CLEANUP_ORDER_FLOW_STATE: "CLEANUP_ORDER_FLOW_STATE",
};

export const CUSTOMER_TYPES = {
  GUEST: "GUEST",
  EXISTING: "EXISTING",
  NEW: "NEW",
  PENDING: "PENDING", // Used to immediately trigger registration when redirected from sign-in PIN page
};
