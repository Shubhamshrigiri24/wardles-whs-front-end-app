import { useSelector, useDispatch } from "react-redux";
import { OrderCustomer, OrderProduct } from "app/store/reducer/order/types";
import {
  SetCustomerAction,
  SetProductAction,
} from "app/store/reducer/order/actions";
import { getProduct, getCustomer } from "app/store/reducer/order/selectors";

export const useCustomer = () => useSelector(getCustomer);

export const useProduct = () => useSelector(getProduct);

export const useSetCustomer = () => {
  const dispatch = useDispatch();

  return (customer: OrderCustomer) => {
    return dispatch(SetCustomerAction(customer));
  };
};

export const useSetProduct = () => {
  const dispatch = useDispatch();

  return (product: OrderProduct) => {
    return dispatch(SetProductAction(product));
  };
};
