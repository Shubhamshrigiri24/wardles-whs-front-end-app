import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import YourDetailsForm, {
  YourDetailsFormProps,
} from "./components/YourDetailsForm";
import AddressLookUp, {
  AddressLookUpProps,
} from "../../components/AddressLookUp";
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

describe("<YourDetailsForm />", () => {
  it("should match the snapshot", () => {
    const props = makeProps();
    const { container } = render(<YourDetailsForm {...props} />);
    expect(container).toMatchSnapshot();
  });
  it("should call onSubmit on form submit with YourDetails details", async () => {
    const props = makeProps();
    const { getByTestId } = render(<YourDetailsForm {...props} />);

    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/firstName"), {
        target: { value: "first-name" },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/lastName"), {
        target: { value: "last-name" },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/email"), {
        target: { value: "hello@email.com" },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/phone"), {
        target: { value: "07777777777" },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/line1"), {
        target: { value: "address line 1" },
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/city"), {
        target: { value: "YourDetails city" },
      });
    });

    const addressLookupProps = makeAddressLookupProps();

    const { getAllByTestId: getAddressLookUpTestById } = render(
      <AddressLookUp {...addressLookupProps} />
    );
    await act(async () => {
      getAddressLookUpTestById("postcode").forEach((test) => {
        fireEvent.change(test, {
          target: { value: "A1 1AA" },
        });
      });
    });
    await act(async () => {
      fireEvent.change(getByTestId("YourDetailsForm/title-select"), {
        target: {
          value: "Miss",
        },
      });
    });
    await act(async () => {
      fireEvent.click(getByTestId("YourDetailsForm/checkbox"));
    });
    await act(async () => {
      fireEvent.click(getByTestId("YourDetailsForm/next-button"));
    });

    expect(props.onSubmit).toBeCalledWith({
      title: "Miss",
      firstName: "first-name",
      lastName: "last-name",
      email: "hello@email.com",
      phone: "07777777777",
      postcode: "A1 1AA",
      line1: "address line 1",
      line2: "",
      city: "YourDetails city",
      allowMarketing: true,
    });
  });
});

function makeProps(v?: Partial<YourDetailsFormProps>): YourDetailsFormProps {
  return {
    onSubmit: jest.fn(),
    fetchAddressesByPostcode: jest.fn(),
    postCodeLookUpAddresses: makePostCodeLookUpAddresses(),
  };
}

function makeAddressLookupProps(
  v?: Partial<AddressLookUpProps>
): AddressLookUpProps {
  return {
    fetchAddressesByPostcode: jest.fn(),
    postCodeLookUpAddresses: makePostCodeLookUpAddresses(),
    setAddress: jest.fn(),
    className: "",
    error: "",
    inputRef: "",
  };
}
