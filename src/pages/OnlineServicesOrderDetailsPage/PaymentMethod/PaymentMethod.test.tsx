import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PaymentMethod, { PaymentMethodProps } from "./PaymentMethod";

beforeEach(() => {
  jest.clearAllMocks();
});

const LAST_FOUR = "1111";
const braintreeToken = "12345678910";
const mockOnchangePaymentMethod = jest.fn();

const makeProps = (props?: Partial<PaymentMethodProps>): PaymentMethodProps => {
  return {
    lastFour: LAST_FOUR,
    braintreeToken,
    braintreeTokenErrorMessage: "",
    onChangePaymentMethod: mockOnchangePaymentMethod,
    ...props,
  };
};
describe("<PaymentMethod />", () => {
  it("should match snapshot", () => {
    const props = makeProps();
    const { container } = render(<PaymentMethod {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render payment method", () => {
    const props = makeProps();
    const { getByTestId } = render(<PaymentMethod {...props} />);
    expect(getByTestId("paymentMethod/lastFour")).toHaveTextContent(
      `XXXX XXXX XXXX ${LAST_FOUR}`
    );
    expect(getByTestId("paymentMethod/change")).toHaveTextContent(
      "Change your payment method"
    );
  });

  it("should render error", () => {
    const errorMessage = "Braintree error";
    const props = makeProps({
      braintreeToken: null,
      braintreeTokenErrorMessage: errorMessage,
    });
    const { getByTestId } = render(<PaymentMethod {...props} />);
    expect(getByTestId("alert/message")).toHaveTextContent(errorMessage);
  });

  it("should call onChangePaymentMethod when change is clicked", () => {
    const props = makeProps();
    const { getByTestId } = render(<PaymentMethod {...props} />);
    const changeButton = getByTestId("paymentMethod/change");
    fireEvent.click(changeButton);
    expect(mockOnchangePaymentMethod).toHaveBeenCalledTimes(1);
  });
});
