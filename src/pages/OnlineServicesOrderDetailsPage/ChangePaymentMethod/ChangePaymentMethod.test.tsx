import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChangePaymentMethod, {
  ChangePaymentMethodProps,
} from "./ChangePaymentMethod";
import mockBraintree from "braintree-web-drop-in";
import mockSubscriptionsApi from "utils/api/SubscriptionsAPI";
import { EventEmitter } from "events";

const mockOnBack = jest.fn();
const mockPerformDataRefetch = jest.fn();
const braintreeInstance = Object.assign(new EventEmitter(), {
  requestPaymentMethod: jest.fn(),
  isPaymentMethodRequestable: jest.fn(),
  clearSelectedPaymentMethod: jest.fn(),
  teardown: jest.fn(),
});

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

jest.mock("../../../utils/api/SubscriptionsAPI", () => ({
  updateSubscriptionPayment: jest.fn(),
}));

jest.mock("braintree-web-drop-in", () => ({
  create: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
  (mockBraintree.create as jest.Mock).mockReturnValue(braintreeInstance);
});

const makeProps = (
  props?: Partial<ChangePaymentMethodProps>
): ChangePaymentMethodProps => {
  return {
    brainTreeToken: "12345678910",
    subscriptionId: "abcdefg",
    threeDSecure: {},
    onBack: mockOnBack,
    performPageDataRefetch: mockPerformDataRefetch,
    ...props,
  };
};

describe("<ChangePaymentMethod />", () => {
  it("should match snapshot", () => {
    const props = makeProps({});
    const { container } = render(<ChangePaymentMethod {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should create drop in instance", async () => {
    const props = makeProps();
    const braintreeEventsSpy = jest.spyOn(braintreeInstance, "on");
    await render(<ChangePaymentMethod {...props} />);
    expect(braintreeEventsSpy).toBeCalledTimes(2);
    expect(braintreeEventsSpy.mock.calls[0][0]).toEqual(
      "paymentMethodRequestable"
    );
    expect(braintreeEventsSpy.mock.calls[1][0]).toEqual(
      "noPaymentMethodRequestable"
    );
    expect(braintreeInstance.isPaymentMethodRequestable).toBeCalledTimes(1);
  });

  it("should destroy braintree instance on unmount", async () => {
    const props = makeProps();
    (mockBraintree.create as jest.Mock).mockReturnValue(braintreeInstance);
    await render(<ChangePaymentMethod {...props} />);
    await cleanup();
    expect(braintreeInstance.teardown).toBeCalledTimes(1);
  });

  it("should change payment method successfully", async () => {
    const props = makeProps();
    const braintreeListenerSpy = jest.spyOn(braintreeInstance, "on");
    braintreeInstance.requestPaymentMethod.mockReturnValue({
      liabilityShifted: true,
      details: {
        lastFour: "1111",
      },
    });
    const { getByTestId } = await render(<ChangePaymentMethod {...props} />);
    const payButton = getByTestId("changePayment/payment-button");
    act(() => {
      const braintreePaymentRequestableCallback =
        braintreeListenerSpy.mock.calls[0][1];
      braintreePaymentRequestableCallback();
    });
    await act(async () => {
      fireEvent.click(payButton);
    });

    expect(braintreeInstance.requestPaymentMethod).toBeCalledTimes(1);
    expect(mockSubscriptionsApi.updateSubscriptionPayment).toBeCalledTimes(1);
    expect(mockOnBack).toBeCalledTimes(1);
    expect(mockPerformDataRefetch).toBeCalledTimes(1);
  });

  it("should show error if requesting a payment method fails", async () => {
    const props = makeProps();
    const braintreeListenerSpy = jest.spyOn(braintreeInstance, "on");
    braintreeInstance.requestPaymentMethod.mockReturnValue(null);

    const { getByText, getByTestId } = await render(
      <ChangePaymentMethod {...props} />
    );

    act(() => {
      const braintreePaymentRequestableCallback =
        braintreeListenerSpy.mock.calls[0][1];
      braintreePaymentRequestableCallback();
    });
    const payButton = getByTestId("changePayment/payment-button");
    await act(async () => {
      fireEvent.click(payButton);
    });

    expect(getByText(/Error on updating payment method/i)).toBeInTheDocument();
    expect(braintreeInstance.clearSelectedPaymentMethod).toBeCalledTimes(1);
  });

  it("should show error when 3dsecure auth fails", async () => {
    const props = makeProps();
    const braintreeListenerSpy = jest.spyOn(braintreeInstance, "on");
    braintreeInstance.requestPaymentMethod.mockReturnValue({
      liabilityShifted: false,
    });
    const { getByText, getByTestId } = await render(
      <ChangePaymentMethod {...props} />
    );
    const payButton = getByTestId("changePayment/payment-button");
    act(() => {
      const braintreePaymentRequestableCallback =
        braintreeListenerSpy.mock.calls[0][1];
      braintreePaymentRequestableCallback();
    });
    await act(async () => {
      fireEvent.click(payButton);
    });

    expect(
      getByText(
        /We were unable to complete your 3DSecure check, please try a different payment method/i
      )
    ).toBeInTheDocument();
    expect(braintreeInstance.clearSelectedPaymentMethod).toBeCalledTimes(1);
  });
});
