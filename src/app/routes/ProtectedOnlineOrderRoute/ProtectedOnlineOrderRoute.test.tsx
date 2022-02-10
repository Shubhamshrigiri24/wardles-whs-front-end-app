import React from "react";
import { render } from "@testing-library/react";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import * as reactRedux from "react-redux";
import { AuthenticationProvider } from "@welldigital/ui-common/Authentication";
import { store } from "app/store";
import { Store } from "redux";
import { OnlineServiceIds as mock_OnlineServiceIds } from "app/store/reducer/online/types";

import ProtectedOnlineOrderRoute, {
  ProtectedOnlineOrderRouteProps,
  RequiredSteps,
} from "./ProtectedOnlineOrderRoute";

const history = createMemoryHistory();

const state = {
  online: {
    consultation: {
      isValidForOrder: true,
    },
  },
  order: {
    customer: {
      customerDetails: {
        firstName: "John",
      },
    },
    product: {
      orderId: "123",
      id: "cialis",
      name: "Cialis",
      packs: [
        {
          itemsPerPack: 8,
          label: "8 tablets",
          name: "Cialis",
          price: 76.99,
          pricePerUnit: 9.62,
          sku: "CI60427085",
        },
      ],
      service: "ed",
      variant: "10 mg",
      subscription: false,
      image: "/static/media/cialis-10mg.123cf61a.png",
    },
  },
};

jest.mock("react-router-dom", () => {
  const { useParams, ...rest } = jest.requireActual("react-router-dom");
  return {
    ...rest,
    useParams: () => {
      return {
        onlineServiceId: mock_OnlineServiceIds.ed,
      };
    },
  };
});

let useSelectorMock = jest
  .spyOn(reactRedux, "useSelector")
  .mockImplementation((callback) => callback(state));

beforeEach(() => {
  useSelectorMock.mockClear();
});

const makeProps = (
  props: Partial<ProtectedOnlineOrderRouteProps>
): ProtectedOnlineOrderRouteProps => {
  return {
    basename: "order",
    requiredStepsIds: [
      RequiredSteps.CONSULTATION,
      RequiredSteps.PRODUCT_SELECTION,
      RequiredSteps.CUSTOMER_DETAILS,
    ],
    ...props,
  };
};

const PATH_NAMES = {
  consultation: `/order/${mock_OnlineServiceIds.ed}/consultation`,
  productSelection: `/order/${mock_OnlineServiceIds.ed}/product-selection`,
  accountDetails: `/order/${mock_OnlineServiceIds.ed}/account-details`,
  payment: `/order/${mock_OnlineServiceIds.ed}/payment`,
};

function renderWithReduxAndAuth(ui: JSX.Element, { store }: { store: Store }) {
  return render(
    <reactRedux.Provider store={store}>
      <AuthenticationProvider loginTarget={"online-services-web"}>
        {ui}
      </AuthenticationProvider>
    </reactRedux.Provider>
  );
}

describe("<ProtectedOnlineRoute />", () => {
  it("should match snapshot if no failed required step", () => {
    const props = makeProps({});
    const { container } = renderWithReduxAndAuth(
      <Router history={history}>
        <Switch>
          <Route path={PATH_NAMES.payment}>
            <ProtectedOnlineOrderRoute {...props}>
              <div data-testid={"protected/page"}>Payment page</div>
            </ProtectedOnlineOrderRoute>
          </Route>
        </Switch>
      </Router>,
      { store }
    );
    history.push(PATH_NAMES.payment);
    expect(history.location.pathname).toEqual(PATH_NAMES.payment);

    expect(container).toMatchSnapshot();
  });

  it("should redirect to consultation from product selection if consultation is not valid", () => {
    const props = makeProps({
      requiredStepsIds: [RequiredSteps.CONSULTATION],
    });

    useSelectorMock = jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) =>
        callback({
          ...state,
          online: {
            consultation: {
              isValidForOrder: false,
            },
          },
        })
      );

    renderWithReduxAndAuth(
      <Router history={history}>
        <Switch>
          <Route path={PATH_NAMES.productSelection}>
            <ProtectedOnlineOrderRoute {...props}>
              <div data-testid={"protected/page"}>Product selection page</div>
            </ProtectedOnlineOrderRoute>
          </Route>
        </Switch>
      </Router>,
      { store }
    );
    history.push(PATH_NAMES.productSelection);
    expect(history.location.pathname).toEqual(PATH_NAMES.consultation);
  });

  it("should redirect to account details from payment if customer details are invalid", () => {
    const props = makeProps({
      requiredStepsIds: [
        RequiredSteps.CONSULTATION,
        RequiredSteps.PRODUCT_SELECTION,
        RequiredSteps.CUSTOMER_DETAILS,
      ],
    });

    useSelectorMock = jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) =>
        callback({
          ...state,
          order: {
            ...state.order,
            customer: {
              customerDetails: null,
            },
          },
        })
      );

    renderWithReduxAndAuth(
      <Router history={history}>
        <Switch>
          <Route path={PATH_NAMES.payment}>
            <ProtectedOnlineOrderRoute {...props}>
              <div data-testid={"protected/page"}>Payment page</div>
            </ProtectedOnlineOrderRoute>
          </Route>
        </Switch>
      </Router>,
      { store }
    );

    history.push(PATH_NAMES.payment);
    expect(history.location.pathname).toEqual(PATH_NAMES.accountDetails);
  });

  it("should redirect to product selection from account details if product is invalid", () => {
    const props = makeProps({
      requiredStepsIds: [
        RequiredSteps.CONSULTATION,
        RequiredSteps.PRODUCT_SELECTION,
      ],
    });

    useSelectorMock = jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) =>
        callback({
          ...state,
          order: {
            ...state.order,
            product: null,
          },
        })
      );

    renderWithReduxAndAuth(
      <Router history={history}>
        <Switch>
          <Route path={PATH_NAMES.accountDetails}>
            <ProtectedOnlineOrderRoute {...props}>
              <div data-testid={"protected/page"}>Payment page</div>
            </ProtectedOnlineOrderRoute>
          </Route>
        </Switch>
      </Router>,
      { store }
    );

    history.push(PATH_NAMES.accountDetails);
    expect(history.location.pathname).toEqual(PATH_NAMES.productSelection);
  });

  it("should redirect to first found invalid step from payment", () => {
    const props = makeProps({});
    useSelectorMock = jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) =>
        callback({
          ...state,
          order: {
            ...state.order,
            product: null,
          },
        })
      );

    renderWithReduxAndAuth(
      <Router history={history}>
        <Switch>
          <Route path={PATH_NAMES.payment}>
            <ProtectedOnlineOrderRoute {...props}>
              <div data-testid={"protected/page"}>Payment page</div>
            </ProtectedOnlineOrderRoute>
          </Route>
        </Switch>
      </Router>,
      { store }
    );
    history.push(PATH_NAMES.payment);
    expect(history.location.pathname).toEqual(PATH_NAMES.productSelection);
  });
});
