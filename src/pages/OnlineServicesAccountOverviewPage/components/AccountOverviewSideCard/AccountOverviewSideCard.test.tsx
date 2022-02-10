import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AccountOverviewSideCard from "./index";

const data = {
  addressline1: "Nowhere street",
  addressline2: "",
  agreeMarketing: false,
  city: "Los Angeles",
  dob: "2000-04-02T00:00:00Z",
  email: "dummy@test.com",
  firstName: "Firstname",
  gender: "m",
  gpDetails: "Well GP Surgery",
  lastName: "Lastname",
  phone: "7777777",
  postcode: "M14LZ",
  updateTime: "0001-01-01T00:00:00Z",
  userId: "4352e499-8424-4a5e-8f0b-3a8d4f4a10b2",
};

describe("<AccountOverviewBanner />", () => {
  it("should match snapshot", () => {
    const { container } = render(<AccountOverviewSideCard data={data} />);
    expect(container).toMatchSnapshot();
  });
});
