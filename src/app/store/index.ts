import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import checkoutReducer from "./reducer/checkout";
import onlineReducer from "./reducer/online";
import orderService from "./reducer/order";
import accountService from "./reducer/account";
import subscriptions from "./reducer/subscriptions";
import orders from "./reducer/orders";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["checkout", "online", "subscriptions", "orders"],
};

const checkoutPersistConfig = {
  key: "checkout",
  storage,
  blacklist: ["braintreeToken", "confirmedPayment"],
};

const orderPersistConfig = {
  key: "order",
  storage,
};

const accountPersistConfig = {
  key: "account",
  storage,
};

const checkout = persistReducer(checkoutPersistConfig, checkoutReducer);
const order = persistReducer(orderPersistConfig, orderService);
const account = persistReducer(accountPersistConfig, accountService);

const online = persistReducer(
  {
    key: "online",
    blacklist: ["onlineServices", "productTokenValid"],
    storage,
  },
  onlineReducer
);

const rootReducers = combineReducers({
  checkout,
  online,
  order,
  account,
  subscriptions,
  orders,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(apiMiddleware, thunk))
);

export const persistor = persistStore(store);
