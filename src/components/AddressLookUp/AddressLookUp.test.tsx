import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddressLookUp, { AddressLookUpProps } from "./";
import { makePostCodeLookUpAddresses } from "app/store/reducer/mock";

global.document.createRange = () =>
  ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  } as any);

describe("<AddressLookUp />", () => {
  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(<AddressLookUp {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should search for the postcode when the search button is clicked", async () => {
    const props = makeProps();
    props.error = "";
    const { getByTestId } = render(<AddressLookUp {...props} />);
    const postcode = "M19 2UL";
    await act(async () => {
      fireEvent.change(getByTestId("postcode"), {
        target: { value: postcode },
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("addressLookUp/search-button"));
    });

    expect(props.fetchAddressesByPostcode).toHaveBeenCalledWith(postcode);
  });
});

function makeProps(): AddressLookUpProps {
  return {
    fetchAddressesByPostcode: jest.fn(),
    postCodeLookUpAddresses: makePostCodeLookUpAddresses(),
    setAddress: jest.fn(),
    className: "className",
    error: "test error message",
  };
}
