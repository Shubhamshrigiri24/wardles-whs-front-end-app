import React from "react";
import { render } from "@testing-library/react";
import PriceInfo, { PriceInfoProps } from "./PriceInfo";

const LABEL = "label";
const PRICE = "£5.99";

const makeProps = (props?: Partial<PriceInfoProps>): PriceInfoProps => {
  return {
    label: LABEL,
    price: PRICE,
    ...props,
  };
};

describe("<PriceInfo />", () => {
  it("should match snapshot", () => {
    const props = makeProps();
    const { container } = render(<PriceInfo {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    const props = makeProps();
    const { getByTestId } = render(<PriceInfo {...props} />);

    expect(getByTestId("priceInfo/label")).toHaveTextContent(LABEL);
    expect(getByTestId("priceInfo/price")).toHaveTextContent(PRICE);
  });

  it("should highlight label and price", () => {
    const props = makeProps({ highlightLabel: true, highlightPrice: true });
    const { getByTestId } = render(<PriceInfo {...props} />);

    expect(getByTestId("priceInfo/label").className).toContain(
      "highlightedText"
    );
    expect(getByTestId("priceInfo/price").className).toContain(
      "highlightedText"
    );
  });
});
