import React from "react";
import { render } from "@testing-library/react";

import Banner from "./";

describe("<Banner />", () => {
  const text =
    "Here is a piece of text to demonstrate what a banner would look like on the page";

  it("should match the snapshot", () => {
    const { baseElement } = render(<Banner>{text}</Banner>);

    expect(baseElement).toMatchSnapshot();
  });

  it("should have content that matches the text props", () => {
    const { getAllByTestId } = render(<Banner>{text}</Banner>);

    getAllByTestId("banner/text-content").forEach(({ textContent }) => {
      expect(textContent).toBe(text);
    });
  });
});
