import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SplitPanel, { SplitPanelProps } from "./SplitPanel";

describe("<SplitPanel />", () => {
  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(
      <SplitPanel {...props}>
        <h1>HI</h1>
      </SplitPanel>
    );
    expect(container).toMatchSnapshot();
  });
});

function makeProps(): SplitPanelProps {
  return {
    main: <h1>Main</h1>,
    secondary: <h1>Secondary</h1>,
  };
}
