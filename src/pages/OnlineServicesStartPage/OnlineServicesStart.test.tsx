import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestProviders from "utils/tests/TestProviders";
import { OnlineServicesStart } from "./OnlineServicesStart";
import { OnlineServiceIds as mock_OnlineServiceIds } from "../../app/store/reducer/online/types";

jest.mock("react-router-dom", () => ({
  useParams: () => {
    return {
      onlineServiceId: mock_OnlineServiceIds.ed,
    };
  },
}));

describe("<OnlineServicesStart />", () => {
  it("The button inside should be the one for the next screen", () => {
    const { getByTestId } = render(
      <TestProviders>
        <OnlineServicesStart />
      </TestProviders>
    );
    const nextButton = getByTestId("next-button");
    expect(nextButton?.getAttribute("to")).toBe("/order/ed/consultation");
  });
});
