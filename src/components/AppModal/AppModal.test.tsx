import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppModal, { AppModalProps } from "./index";

const mockOnBack = jest.fn();
const mockOnSuccess = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

const makeProps = (props?: Partial<AppModalProps>): AppModalProps => {
  return {
    isOpen: true,
    onBack: mockOnBack,
    onSuccess: mockOnSuccess,
    ...props,
  };
};

describe("<AppModal />", () => {
  it("should match snapshot", () => {
    const props = makeProps();
    const { baseElement } = render(<AppModal {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should open", async () => {
    const props = makeProps({ title: "Test modal title" });
    const { getByTestId } = render(<AppModal {...props} />);
    expect(getByTestId("appModal/title")).toBeInTheDocument();
    expect(getByTestId("appModal/title")).toHaveTextContent("Test modal title");
  });

  it("should fire Back button", async () => {
    const props = makeProps();
    const { getByTestId } = render(<AppModal {...props} />);
    const backButton = getByTestId("appModal/backButton");
    await act(async () => {
      fireEvent.click(backButton);
    });
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should fire Success button", async () => {
    const props = makeProps();
    const { getByTestId } = render(<AppModal {...props} />);
    const successButton = getByTestId("appModal/successButton");
    await act(async () => {
      fireEvent.click(successButton);
    });
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  it("should render children", () => {
    const props = makeProps();
    const { getByTestId } = render(
      <AppModal {...props}>
        <div data-testid={"appModal/children"}>test children</div>
      </AppModal>
    );
    expect(getByTestId("appModal/children")).toBeInTheDocument();
  });

  it("should render default label for buttons", () => {
    const props = makeProps();
    const { getByText } = render(<AppModal {...props} />);
    ["Back", "Continue"].forEach((label) => {
      expect(getByText(label)).toBeInTheDocument();
    });
  });

  it("should pass label to back button", () => {
    const props = makeProps({ backLabel: "Go back" });
    const { getByText } = render(<AppModal {...props} />);
    expect(getByText("Go back")).toBeInTheDocument();
  });

  it("should pass label to success button", () => {
    const props = makeProps({ backLabel: "Next" });
    const { getByText } = render(<AppModal {...props} />);
    expect(getByText("Next")).toBeInTheDocument();
  });
});
