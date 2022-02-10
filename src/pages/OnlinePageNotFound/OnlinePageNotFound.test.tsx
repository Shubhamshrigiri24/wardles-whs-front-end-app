import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import OnlinePageNotFound from "./OnlinePageNotFound";

describe("<OnlinePageNotFound />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<OnlinePageNotFound />);
    expect(container).toMatchSnapshot();
  });
});
