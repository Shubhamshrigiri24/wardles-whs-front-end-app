import React from "react";
import { act, render, screen } from "@testing-library/react";
import OnlinePaymentPage, { OnlinePaymentPageProps } from "./OnlinePaymentPage";
import mockReactRouter from "react-router-dom";
import {
  customerDetails,
  deliveryDetails,
  makePack,
} from "app/store/reducer/mock";
import userEvent from "@testing-library/user-event";
import { analytics as mockAnalytics } from "@welldigital/ui-common/Analytics";
import mockBraintree from "braintree-web-drop-in";
import { EventEmitter } from "events";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("braintree-web-drop-in", () => ({
  create: jest.fn(),
}));

jest.mock("@welldigital/ui-common/Analytics", () => ({
  analytics: { trackEvent: jest.fn() },
}));

describe("Online Payment Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("fires payment complete event when payment is completed successfully", async () => {
    const props = makeProps();

    (mockReactRouter.useParams as unknown as jest.Mock).mockReturnValue({
      onlineServiceId: props.selectedService.id,
    });
    (mockReactRouter.useHistory as unknown as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    const braintreeInstance = Object.assign(new EventEmitter(), {
      requestPaymentMethod: jest.fn(),
      isPaymentMethodRequestable: jest.fn(),
      teardown: jest.fn(),
    });
    braintreeInstance.requestPaymentMethod.mockReturnValue({
      liabilityShifted: true,
    });
    const braintreeListenerSpy = jest.spyOn(braintreeInstance, "on");
    (mockBraintree.create as unknown as jest.Mock).mockReturnValue(
      braintreeInstance
    );

    await act(async () => {
      await render(<OnlinePaymentPage {...props} />);
    });
    expect(braintreeListenerSpy).toBeCalledTimes(2);
    expect(braintreeListenerSpy.mock.calls[0][0]).toEqual(
      "paymentMethodRequestable"
    );
    expect(braintreeListenerSpy.mock.calls[1][0]).toEqual(
      "noPaymentMethodRequestable"
    );

    act(() => {
      const braintreePaymentRequestableCallback =
        braintreeListenerSpy.mock.calls[0][1];
      braintreePaymentRequestableCallback({
        paymentMethodIsSelected: false,
      });
    });

    await act(async () => {
      await userEvent.click(screen.getByTestId("paymentPanel/payment-button"));
    });

    await act(async () => {
      await render(<OnlinePaymentPage {...props} successfulOrder />);
    });

    expect(mockAnalytics.trackEvent).toBeCalledTimes(1);
    expect(mockAnalytics.trackEvent).toBeCalledWith({
      flow: props.selectedService.id,
      event: "Payment complete",
    });
  });

  it("doesn't fire payment complete event when payment fails", async () => {
    const props = makeProps();

    (mockReactRouter.useParams as unknown as jest.Mock).mockReturnValue({
      onlineServiceId: props.selectedService.id,
    });

    const braintreeInstance = Object.assign(new EventEmitter(), {
      requestPaymentMethod: jest.fn(),
      isPaymentMethodRequestable: jest.fn(),
      teardown: jest.fn(),
    });
    braintreeInstance.requestPaymentMethod.mockReturnValue(null);
    const braintreeListenerSpy = jest.spyOn(braintreeInstance, "on");
    (mockBraintree.create as unknown as jest.Mock).mockReturnValue(
      braintreeInstance
    );

    await act(async () => {
      await render(<OnlinePaymentPage {...props} />);
    });
    expect(braintreeListenerSpy).toBeCalledTimes(2);

    // we keep this for future refference in case we need to test the button state
    // act(() => {
    //   const braintreePaymentRequestableCallback =
    //     braintreeListenerSpy.mock.calls[0][1];
    //   braintreePaymentRequestableCallback({
    //     paymentMethodIsSelected: false,
    //   });
    // });

    await act(async () => {
      await userEvent.click(screen.getByTestId("paymentPanel/payment-button"));
    });

    expect(mockAnalytics.trackEvent).toBeCalledTimes(0);
  });
});

function makeProps(): OnlinePaymentPageProps {
  return {
    braintreeToken: "token",
    successfulOrder: false,
    orderErrorMessage: "",
    customerDetails,
    basket: makePack(),
    consultation: [],
    deliveryDetails,
    selectedService: {
      id: "test-service",
      name: "test-service-name",
    },
    productToken: null,
    onOrder: jest.fn(),
    invalidateProductToken: jest.fn(),
    fetchBraintreeToken: jest.fn(),
    clearOrderFailureError: jest.fn(),
  };
}
