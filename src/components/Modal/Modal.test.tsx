import React from "react";
import { render } from "@testing-library/react";

import Modal, { ModalProps } from "./Modal";

describe("<Modal />", () => {
  const props = makeProps();
  it("should match snapshot'", () => {
    const { getByTestId } = render(<Modal {...props} />);
    const modal = getByTestId("Modal-component");
    expect(modal).toMatchSnapshot();
  });

  it("should contain a title text component", () => {
    const { getByTestId } = render(<Modal {...props} />);
    expect(getByTestId("Modal-title-text").textContent).toBe("Title text");
  });
  it("should contain a body text component", () => {
    const { getByTestId } = render(<Modal {...props} />);
    expect(getByTestId("Modal-body-text").textContent).toBe("Content of modal");
  });
});

function makeProps(v?: Partial<ModalProps>): ModalProps {
  return {
    title: "Title text",
    text: "Content of modal",
    isOpen: true,
  };
}
