import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import Footer from "./Footer";

const Wrapper: React.FC = (props) => <Router>{props.children}</Router>;

const renderOptions = {
  wrapper: Wrapper,
};

describe("<Footer/>", () => {
  it("should match the Footer snapshot", () => {
    const { container } = render(<Footer />, renderOptions);

    expect(container).toMatchSnapshot();
  });

  it("should link to feedback url", () => {
    const { getByTestId } = render(<Footer />, renderOptions);

    expect(getByTestId("footer/link-to-feedback")).toHaveAttribute(
      "href",
      "https://docs.google.com/forms/d/e/1FAIpQLSflwFAsIn5HsTHIBOg2rLDqZmrB0DEiLa0c0_Z_X8NbsOlrjw/viewform?usp=sf_link"
    );
  });

  it("should link to terms & conditions", () => {
    const { getByTestId } = render(<Footer />, renderOptions);

    expect(getByTestId("footer/link-to-t-and-c")).toHaveAttribute(
      "href",
      "https://www.well.co.uk/about-us/policies/terms-and-conditions-vaccination-services"
    );
  });

  it("should link to privacy policy", () => {
    const { getByTestId } = render(<Footer />, renderOptions);

    expect(getByTestId("footer/link-to-privacy-policy")).toHaveAttribute(
      "href",
      "https://www.well.co.uk/about-us/policies/privacy"
    );
  });

  it("should link to cookies", () => {
    const { getByTestId } = render(<Footer />, renderOptions);

    expect(getByTestId("footer/link-to-cookies")).toHaveAttribute(
      "href",
      "https://www.well.co.uk/about-us/policies/cookies"
    );
  });

  it("should link to email address", () => {
    const { getByTestId } = render(<Footer />, renderOptions);

    expect(getByTestId("footer/link-to-help")).toHaveAttribute(
      "href",
      "mailto:hello@well.co.uk"
    );
  });
});
