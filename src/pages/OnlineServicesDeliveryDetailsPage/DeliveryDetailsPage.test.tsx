import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeliveryForm, {
  DeliveryDetailsFormProps,
} from "./DeliveryForm/DeliveryForm";
import { CustomerDetails } from "../../app/store/reducer/checkout/types";

import { makePostCodeLookUpAddresses } from "app/store/reducer/mock";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
beforeEach(() => {
  mockHistoryPush.mockReset();
});

describe("<DeliveryForm />", () => {
  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(<DeliveryForm {...props} />);
    expect(container).toMatchSnapshot();
  });
  it("should auto fill form if 'use customer details' box is ticked", async () => {
    const props = makeProps();
    const { getByTestId } = render(<DeliveryForm {...props} />);
    const checkbox = getByTestId("DeliveryDetailsForm/checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).toHaveProperty("checked", true);
    expect(getByTestId("DeliveryDetailsForm/firstName")).toHaveProperty(
      "value",
      "firstName"
    );
    expect(getByTestId("DeliveryDetailsForm/city")).toHaveProperty(
      "value",
      "delivery city"
    );
  });
  it.skip("should call onSubmit on form submit with delivery details", async () => {
    const props = makeProps();
    const { getByTestId } = render(<DeliveryForm {...props} />);

    const checkbox = getByTestId("DeliveryDetailsForm/checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    await act(async () => {
      fireEvent.change(getByTestId("DeliveryDetailsForm/title-select"), {
        target: {
          value: "Miss",
        },
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("DeliveryDetailsForm/next-button"));
    });
    expect(props.onSubmit).toBeCalledWith({
      title: "Miss",
      firstName: "firstName",
      lastName: "lastName",
      postcode: "M19 2UL",
      line1: "line1",
      line2: "line2",
      city: "delivery city",
    });
  });
});

function makeProps(
  v?: Partial<DeliveryDetailsFormProps>
): DeliveryDetailsFormProps {
  return {
    onSubmit: jest.fn(),
    customerDetails: customerDetails,
    fetchAddressesByPostcode: jest.fn(),
    postCodeLookUpAddresses: makePostCodeLookUpAddresses(),
  };
}

const customerDetails: CustomerDetails = {
  firstName: "firstName",
  lastName: "lastName",
  email: "a@b.com",
  postcode: "M19 2UL",
  line1: "line1",
  line2: "line2",
  city: "delivery city",
  phone: "01189998819991197253",
  surgeryName: "surgeryName",
  surgeryAddress: "surgeryAddress",
  allowMarketing: true,
};
