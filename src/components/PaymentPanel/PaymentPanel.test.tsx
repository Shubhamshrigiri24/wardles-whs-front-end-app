import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PaymentPanel, { PaymentPanelProps } from "./PaymentPanel";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockHistoryPush = jest.fn();
beforeEach(() => {
  mockHistoryPush.mockReset();
});

describe("<PaymentPanel />", () => {
  it("should match the snapshot", async () => {
    const props = makeProps();
    await act(async () => {
      const { container } = render(<PaymentPanel {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
  it("should match the snapshot on error", async () => {
    const props = makeProps({ paymentErrorMessage: "error" });
    await act(async () => {
      const { container } = render(<PaymentPanel {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
  it("should match the snapshot when loading", async () => {
    const props = makeProps({ loading: true });
    await act(async () => {
      const { container } = render(<PaymentPanel {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
  it("should call onPay if you click the pay button", async () => {
    const props = makeProps();
    const { getByTestId } = render(<PaymentPanel {...props} />);
    await act(async () => {
      fireEvent.click(getByTestId("paymentPanel/payment-button"));
    });
    expect(props.onPay).toHaveBeenCalled();
  });
  it("should not call onPay the button is disabled", async () => {
    const props = makeProps({ disableButton: true });
    const { getByTestId } = render(<PaymentPanel {...props} />);
    await act(async () => {
      fireEvent.click(getByTestId("paymentPanel/payment-button"));
    });
    expect(props.onPay).toHaveBeenCalledTimes(0);
  });
});

function makeProps(v?: Partial<PaymentPanelProps>): PaymentPanelProps {
  return {
    paymentErrorMessage: v?.paymentErrorMessage ?? "",
    disableButton: v?.disableButton ?? false,
    loading: v?.loading ?? false,
    onPay: jest.fn(),
    isPaying: false,
  };
}
