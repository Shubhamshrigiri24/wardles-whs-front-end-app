import React from "react";
import { render } from "@testing-library/react";
import DiscountInfo, { DiscountInfoProps } from "./DiscountInfo";

const TITLE = "title";
const LABEL = "label";
const PRICE = "£3.99";

const makeProps = (props?: Partial<DiscountInfoProps>): DiscountInfoProps => {
  return {
    title: TITLE,
    label: LABEL,
    price: PRICE,
    ...props,
  };
};

describe("<DiscountInfo />", () => {
  it("should match snapshot", () => {
    const props = makeProps();
    const { container } = render(<DiscountInfo {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render props correctly", () => {
    const props = makeProps();
    const { getByTestId } = render(<DiscountInfo {...props} />);

    expect(getByTestId("discountInfo/title")).toHaveTextContent(TITLE);
    expect(getByTestId("discountInfo/label")).toHaveTextContent(LABEL);
    expect(getByTestId("discountInfo/price")).toHaveTextContent(PRICE);
  });
});
