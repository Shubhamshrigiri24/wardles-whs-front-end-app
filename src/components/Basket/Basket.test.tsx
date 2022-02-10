import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router, generatePath } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { OrderProduct } from "app/store/reducer/order/types";
import { ORDER_PAYMENT_PATH } from "constants/paths";
import * as reactRedux from "react-redux";
import { store } from "app/store";
import Basket from "./index";

const product: OrderProduct = {
  id: "sildenafil",
  name: "Sildenafil",
  service: "ed",
  packs: [
    {
      isBestValue: false,
      itemsPerPack: 16,
      label: "16 tablets",
      name: "Sildenafil",
      price: 49.99,
      pricePerUnit: 3.12,
      sku: "SI05359848",
      basePrice: 123,
      discounts: [
        {
          code: "subscription",
          type: "percentage",
          discountInfo: 10,
          discountAmount: 5.2,
          priceWithDiscount: 46.79,
        },
      ],
    },
  ],
  variant: "50 mg",
  subscription: true,
  image: "/static/media/sildenafil.3523fa82.png",
};

const productWithDiscount: OrderProduct = {
  ...product,
  packs: [
    {
      ...product.packs[0],
      price: 44.99,
      discounts: [
        {
          code: "DUMMY_CODE_10",
          type: "percentage",
          discountAmount: 5,
          discountInfo: 10,
          priceWithDiscount: 40,
        },
      ],
    },
  ],
};

const history = createMemoryHistory();
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

beforeEach(() => {
  useSelectorMock.mockClear();
  history.push("/");
});

const renderWithStore = () =>
  render(
    <Router history={history}>
      <reactRedux.Provider store={store}>
        <Basket />
      </reactRedux.Provider>
    </Router>
  );

describe("<Basket />", () => {
  describe("When the component is rendered without a product", () => {
    it('should display a "missing product" message', () => {
      const { getByText } = renderWithStore();
      expect(getByText(/You must select a product/)).toBeInTheDocument();
    });

    it("should not display the discounts block", () => {
      const { queryByRole } = renderWithStore();
      expect(queryByRole("button", { name: "Apply discount" })).toBeNull();
    });
  });

  describe("When the component is rendered with a product", () => {
    it("Should display the discounts block", () => {
      useSelectorMock.mockReturnValue(product);
      const { getByRole } = renderWithStore();

      expect(
        getByRole("button", { name: "Apply discount" })
      ).toBeInTheDocument();
    });

    describe("When a valid discount code has been submitted", () => {
      it("should be displayed in the basket", () => {
        useSelectorMock.mockReturnValue(productWithDiscount);
        const { getByText } = renderWithStore();

        expect(getByText(/DUMMY_CODE_10: 10% off/)).toBeInTheDocument();
        expect(getByText(/£5.00/)).toBeInTheDocument();
      });

      it("should update the basket total", () => {
        useSelectorMock.mockReturnValue(productWithDiscount);
        const { getByText } = renderWithStore();

        expect(getByText(/£44.99/)).toBeInTheDocument();
      });

      describe("When the user tries to submit a second discount code", () => {
        it("should display error message", () => {
          useSelectorMock.mockReturnValue(productWithDiscount);
          const { getByTestId, getByRole, getByText } = renderWithStore();

          const inputField = getByTestId("basket/discount-code-input");
          const submitButton = getByRole("button", { name: "Apply discount" });

          userEvent.type(inputField, "SECOND_DISCOUNT_CODE_10");
          userEvent.click(submitButton);

          expect(
            getByText(/Only one discount code can be applied to your basket./)
          ).toBeInTheDocument();
        });
      });

      describe("When the user tries to submit an empty discount code", () => {
        it("should display error message", () => {
          useSelectorMock.mockReturnValue(product);
          const { getByRole, getByText } = renderWithStore();

          const submitButton = getByRole("button", { name: /Apply discount/ });

          userEvent.click(submitButton);

          expect(
            getByText(/Invalid discount code. Please try again/)
          ).toBeInTheDocument();
        });
      });

      describe("When the user is on payment page", () => {
        it("should disable discount codes interaction", () => {
          const paymentPageRoute = generatePath(ORDER_PAYMENT_PATH, {
            onlineServiceId: "ed",
          });
          history.push(paymentPageRoute);

          const { queryByRole, queryByTestId } = renderWithStore();

          expect(queryByRole("button", { name: /Apply discount/ })).toBeNull();
          expect(queryByTestId("basket/remove-1")).toBeNull();
        });
      });
    });

    it("should match snapshot", () => {
      useSelectorMock.mockReturnValue(product);
      const { container } = renderWithStore();
      expect(container).toMatchSnapshot();
    });
  });
});
