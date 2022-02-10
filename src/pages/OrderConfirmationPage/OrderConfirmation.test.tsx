import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import OrderConfirmationPage from "./OrderConfirmation";
import { makePack, makeProduct } from "app/store/reducer/mock";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Ed, Hana } from "app/store/reducer/online/types";

const history = createMemoryHistory();
const route = "/ed/checkout/confirmation";
history.push(route);

describe("<OrderConfirmationPage />", () => {
  it("should match the snapshot and have expected props for Ed", () => {
    const { container } = render(
      <Router history={history}>
        <OrderConfirmationPage
          selectedOnlineService={Ed}
          selectedProduct={makeProduct(undefined, {
            service: Ed.id,
            name: "viagra connect",
          })}
          selectedPack={makePack()}
          orderNumber="1234567"
          onlineConsultation={[]}
        />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
  it("should match the snapshot and have expected props for Hana", () => {
    const { container } = render(
      <Router history={history}>
        <OrderConfirmationPage
          selectedOnlineService={Hana}
          selectedProduct={makeProduct(undefined, { service: Hana.id })}
          selectedPack={makePack()}
          orderNumber="1234567"
          onlineConsultation={[]}
        />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
