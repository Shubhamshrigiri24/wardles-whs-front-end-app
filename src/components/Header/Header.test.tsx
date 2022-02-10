import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "./Header";

const Wrapper: React.FC = (props) => <Router>{props.children}</Router>;

const renderOptions = {
  wrapper: Wrapper,
};

describe("<Header/>", () => {
  it("should match the Header snapshot", () => {
    const { container } = render(<Header />, renderOptions);

    expect(container).toMatchSnapshot();
  });

  it("should link to the home url", () => {
    const { getByTestId } = render(<Header />, renderOptions);

    expect(getByTestId("header/link-to-home")).toHaveAttribute(
      "href",
      "https://www.well.co.uk/services"
    );
  });
});
