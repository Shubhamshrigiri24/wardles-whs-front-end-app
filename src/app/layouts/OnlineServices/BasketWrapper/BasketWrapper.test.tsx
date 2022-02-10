import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BasketWrapper, { BasketWrapperStateProps } from "./BasketWrapper";
import { makeProduct } from "app/store/reducer/mock";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Ed } from "../../../store/reducer/online/types";

const history = createMemoryHistory();

describe("<BasketWrapper />", () => {
  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(
      <Router history={history}>
        <BasketWrapper {...props} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});

function makeProps(): BasketWrapperStateProps {
  const product = makeProduct();
  return {
    selectedOnlineService: Ed,
    basketItem: product.packs[1],
    product,
    children: [<h1 key={"1"}>Hello</h1>] as any,
  };
}
