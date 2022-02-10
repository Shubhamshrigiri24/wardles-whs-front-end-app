import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AccountOverviewBanner from "./index";

describe("<AccountOverviewBanner />", () => {
  it("should match snapshot", () => {
    const { container } = render(<AccountOverviewBanner />);
    expect(container).toMatchSnapshot();
  });

  it("should render title and content", () => {
    const { getByTestId } = render(<AccountOverviewBanner />);
    const title = getByTestId("accountOverviewBanner/title");
    const content = getByTestId("accountOverviewBanner/content");
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
