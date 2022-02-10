import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as reactRedux from "react-redux";
import TestProviders from "utils/tests/TestProviders";
import { PRODUCT_CONSTANTS } from "constants/product";
import OnlineAccountOverviewPage from "./index";

const state = {
  account: {
    data: {
      updateTime: "0001-01-01T00:00:00Z",
      firstName: "Tiberiu",
      lastName: "Mitiloaga",
      gender: "m",
      dob: "1980-04-29T00:00:00Z",
      phone: "7777777",
      email: "tiberiu.mitiloaga@well.co.uk",
      userId: "4352e499-8424-4a5e-8f0b-3a8d4f4a10b2",
      postcode: "M14LZ",
      addressline1: "Nowhere street",
      addressline2: "",
      city: "Bucharest",
      agreeMarketing: false,
      gpDetails: "Well GP Surgery",
    },
    status: "LOADED",
  },
  subscriptions: {
    data: [
      {
        id: "32111111-1111-1111-1111-111111111111",
        productSku: "SI05359845",
        nextOrderDate: "2021-09-20",
        createdDate: "2021-08-20",
        status: "APPROVED",
        type: "subscription",
        title: "Sildenafil",
        product: {
          __meta__: {
            id: "sildenafil",
            productName: "Sildenafil",
            activeIngredient: "Sildenafil",
            imageURI: "/static/media/sildenafil.3523fa82.png",
            worksIn: "30-60 min  ",
            duration: "4-5 hrs",
            isBestValue: true,
            canBuy: true,
            description:
              "Sildenafil contains the same active ingredient as Viagra Connect and works in the same way. As it doesn't have a brand name, it's usually cheaper to buy.",
            moreInfo: [
              {
                title: "Manufacturer",
                content: "Pfizer and various companies",
              },
              {
                title: "How should I take it?",
                content:
                  "Swallow one whole tablet with water an hour before sex.",
              },
              {
                title: "Can I drink alcohol with it?",
                content:
                  "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
              },
              {
                title: "Can I take it with food?",
                content:
                  "You can but it may take longer to work if you take it with a heavy meal.",
              },
              {
                title: "Can I drive after taking it?",
                content:
                  "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
              },
            ],
            priceTemplate: "Price: £<price>",
            buyLinkURITemplate: "/login-options",
            startConsultationLinkURI: "/order/ed/consultation",
            defaultPricePath: ["50", PRODUCT_CONSTANTS.subscription, "16"],
            levels: [
              {
                renderOrder: 0,
                levelLabel: "Strength",
                columnLabelTemplate: "<value> mg",
              },
              {
                renderOrder: 2,
                levelLabel: PRODUCT_CONSTANTS.subscription,
                columnLabelTemplate: "<value>",
                stealPriceFromSelectedChild: true,
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
              {
                renderOrder: 1,
                levelLabel: "Pack size",
                columnLabelTemplate: "<value> tablets",
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
            ],
            startingPrice: 3.25,
          },
          priceTree: {
            "50": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "SI05359845",
                  price: 12.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "SI05359846",
                  price: 24.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "SI05359847",
                  price: 37.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "SI05359848",
                  price: 49.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "SI05359845",
                  price: 14.99,
                },
                "8": {
                  sku: "SI05359846",
                  price: 26.99,
                },
                "12": {
                  sku: "SI05359847",
                  price: 39.99,
                },
                "16": {
                  sku: "SI05359848",
                  price: 51.99,
                },
              },
            },
          },
          selectedPack: {
            sku: "SI05359845",
            price: 12.99,
            meta: {
              subscriptionDuration: null,
            },
            strength: "50",
            orderType: PRODUCT_CONSTANTS.subscription,
            itemsPerPack: "4",
          },
        },
        content: [
          {
            label: "Status",
          },
          {
            label: "Start Date",
            value: "2021-08-20",
          },
          {
            label: "Renewal Date",
            value: "2021-09-20",
          },
        ],
      },
      {
        id: "12111111-1111-1111-1111-111111111111",
        productSku: "CI60427084",
        nextOrderDate: "2021-09-04",
        createdDate: "2021-08-04",
        status: "ACTIVE",
        type: "subscription",
        title: "Cialis",
        product: {
          __meta__: {
            id: "cialis",
            productName: "Cialis",
            activeIngredient: "Tadalafil",
            imageURI: "/static/media/cialis-10mg.123cf61a.png",
            worksIn: "30 min ",
            duration: "up to 36 hrs",
            isBestValue: false,
            canBuy: true,
            description:
              "Cialis is a branded form of the medicine tadalafil. Tadalafil can be effective for up to 36 hours so can allow for more spontaneity than some other ED treatments.",
            moreInfo: [
              {
                title: "Manufacturer",
                content: "Eli Lilly and Company Limited",
              },
              {
                title: "How should I take it?",
                content:
                  "Swallow one whole tablet with water at least 30 minutes before sex.",
              },
              {
                title: "Can I drink alcohol with it?",
                content:
                  "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
              },
              {
                title: "Can I take it with food?",
                content: "You can take Cialis with or without food.",
              },
              {
                title: "Can I drive after taking it?",
                content:
                  "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
              },
            ],
            priceTemplate: "Price: £<price>",
            buyLinkURITemplate: "/login-options",
            startConsultationLinkURI: "/order/ed/consultation",
            defaultPricePath: ["10", PRODUCT_CONSTANTS.subscription, "16"],
            levels: [
              {
                renderOrder: 0,
                levelLabel: "Strength",
                columnLabelTemplate: "<value> mg",
              },
              {
                renderOrder: 2,
                levelLabel: PRODUCT_CONSTANTS.subscription,
                columnLabelTemplate: "<value>",
                stealPriceFromSelectedChild: true,
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
              {
                renderOrder: 1,
                levelLabel: "Pack size",
                columnLabelTemplate: "<value> tablets",
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
            ],
            startingPrice: 9.5,
          },
          priceTree: {
            "10": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "CI60427084",
                  price: 38.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "CI60427085",
                  price: 74.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "CI60427086",
                  price: 112.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "CI60427087",
                  price: 149.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "CI60427084",
                  price: 40.99,
                },
                "8": {
                  sku: "CI60427085",
                  price: 76.99,
                },
                "12": {
                  sku: "CI60427086",
                  price: 114.99,
                },
                "16": {
                  sku: "CI60427087",
                  price: 151.99,
                },
              },
            },
            "20": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "CI60427088",
                  price: 43.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "CI60427089",
                  price: 85.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "CI60427090",
                  price: 123.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "CI60427091",
                  price: 157.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "CI60427088",
                  price: 45.99,
                },
                "8": {
                  sku: "CI60427089",
                  price: 87.99,
                },
                "12": {
                  sku: "CI60427090",
                  price: 125.99,
                },
                "16": {
                  sku: "CI60427091",
                  price: 159.99,
                },
              },
            },
          },
          selectedPack: {
            sku: "CI60427084",
            price: 38.99,
            meta: {
              subscriptionDuration: null,
            },
            strength: "10",
            orderType: PRODUCT_CONSTANTS.subscription,
            itemsPerPack: "4",
          },
        },
        content: [
          {
            label: "Status",
            value: "Active",
          },
          {
            label: "Start Date",
            value: "2021-08-04",
          },
          {
            label: "Renewal Date",
            value: "2021-09-04",
          },
        ],
      },
      {
        id: "22111111-1111-1111-1111-111111111111",
        productSku: "TA96561729",
        nextOrderDate: "2021-08-29",
        createdDate: "2021-07-29",
        status: "APPROVED",
        type: "subscription",
        title: "Tadalafil",
        product: {
          __meta__: {
            id: "tadalafil",
            productName: "Tadalafil",
            activeIngredient: "Tadalafil",
            imageURI: "/static/media/tadalafil-10mg.454d24a0.png",
            worksIn: "30 min  ",
            duration: "up to 36 hrs",
            isBestValue: false,
            canBuy: true,
            description:
              "Tadalafil contains the same active ingredient as Cialis and works in the same way. As it is a non-branded treatment it's usually cheaper to buy. Tadalafil can be effective for up to 36 hours so can allow for more spontaneity than some other ED treatments.",
            moreInfo: [
              {
                title: "Manufacturer",
                content: "Various companies",
              },
              {
                title: "How should I take it?",
                content:
                  "Swallow one whole tablet with water at least 30 minutes before sex.",
              },
              {
                title: "Can I drink alcohol with it?",
                content:
                  "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
              },
              {
                title: "Can I take it with food?",
                content: "You can take tadalafil with or without food.",
              },
              {
                title: "Can I drive after taking it?",
                content:
                  "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
              },
            ],
            priceTemplate: "Price: £<price>",
            buyLinkURITemplate: "/login-options",
            startConsultationLinkURI: "/order/ed/consultation",
            defaultPricePath: ["10", PRODUCT_CONSTANTS.subscription, "16"],
            levels: [
              {
                renderOrder: 0,
                levelLabel: "Strength",
                columnLabelTemplate: "<value> mg",
              },
              {
                renderOrder: 2,
                levelLabel: PRODUCT_CONSTANTS.subscription,
                columnLabelTemplate: "<value>",
                stealPriceFromSelectedChild: true,
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
              {
                renderOrder: 1,
                levelLabel: "Pack size",
                columnLabelTemplate: "<value> tablets",
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
            ],
            startingPrice: 4.75,
          },
          priceTree: {
            "10": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "TA96561726",
                  price: 22.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "TA96561727",
                  price: 39.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "TA96561728",
                  price: 57.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "TA96561729",
                  price: 73.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "TA96561726",
                  price: 24.99,
                },
                "8": {
                  sku: "TA96561727",
                  price: 41.99,
                },
                "12": {
                  sku: "TA96561728",
                  price: 59.99,
                },
                "16": {
                  sku: "TA96561729",
                  price: 75.99,
                },
              },
            },
            "20": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "TA96561730",
                  price: 25.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "TA96561731",
                  price: 47.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "TA96561732",
                  price: 62.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "TA96561733",
                  price: 79.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "TA96561730",
                  price: 27.99,
                },
                "8": {
                  sku: "TA96561731",
                  price: 49.99,
                },
                "12": {
                  sku: "TA96561732",
                  price: 64.99,
                },
                "16": {
                  sku: "TA96561733",
                  price: 81.99,
                },
              },
            },
          },
          selectedPack: {
            sku: "TA96561729",
            price: 73.99,
            meta: {
              subscriptionDuration: null,
            },
            strength: "10",
            orderType: PRODUCT_CONSTANTS.subscription,
            itemsPerPack: "16",
          },
        },
        content: [
          {
            label: "Status",
          },
          {
            label: "Start Date",
            value: "2021-07-29",
          },
          {
            label: "Renewal Date",
            value: "2021-08-29",
          },
        ],
      },
    ],
    status: "LOADED",
  },
  orders: {
    data: [
      {
        orderId: "1630318430917",
        products: [
          {
            sku: "SI05359847",
            quantity: 1,
            description: "Sildenafil (12 Tablets)",
            serviceId: "ed",
          },
        ],
        date: "2021-08-30",
        id: "1630318430917",
        type: "individual order",
        title: "Sildenafil",
        product: {
          __meta__: {
            id: "sildenafil",
            productName: "Sildenafil",
            activeIngredient: "Sildenafil",
            imageURI: "/static/media/sildenafil.3523fa82.png",
            worksIn: "30-60 min  ",
            duration: "4-5 hrs",
            isBestValue: true,
            canBuy: true,
            description:
              "Sildenafil contains the same active ingredient as Viagra Connect and works in the same way. As it doesn't have a brand name, it's usually cheaper to buy.",
            moreInfo: [
              {
                title: "Manufacturer",
                content: "Pfizer and various companies",
              },
              {
                title: "How should I take it?",
                content:
                  "Swallow one whole tablet with water an hour before sex.",
              },
              {
                title: "Can I drink alcohol with it?",
                content:
                  "Drinking alcohol can temporarily affect your ability to get an erection. For the medicine to work well, it's better not to drink large quantities of alcohol before taking it.",
              },
              {
                title: "Can I take it with food?",
                content:
                  "You can but it may take longer to work if you take it with a heavy meal.",
              },
              {
                title: "Can I drive after taking it?",
                content:
                  "Some side effects this medicine can cause include dizziness and blurred vision. See how you respond to the medicine and if you experience any of these side effects before driving.",
              },
            ],
            priceTemplate: "Price: £<price>",
            buyLinkURITemplate: "/login-options",
            startConsultationLinkURI: "/order/ed/consultation",
            defaultPricePath: ["50", PRODUCT_CONSTANTS.subscription, "16"],
            levels: [
              {
                renderOrder: 0,
                levelLabel: "Strength",
                columnLabelTemplate: "<value> mg",
              },
              {
                renderOrder: 2,
                levelLabel: PRODUCT_CONSTANTS.subscription,
                columnLabelTemplate: "<value>",
                stealPriceFromSelectedChild: true,
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
              {
                renderOrder: 1,
                levelLabel: "Pack size",
                columnLabelTemplate: "<value> tablets",
                pricePerUnitTemplate: "£<price> per unit",
                shouldDeriveBestValue: true,
              },
            ],
            startingPrice: 3.25,
          },
          priceTree: {
            "50": {
              [PRODUCT_CONSTANTS.subscription]: {
                "4": {
                  sku: "SI05359845",
                  price: 12.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "8": {
                  sku: "SI05359846",
                  price: 24.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "12": {
                  sku: "SI05359847",
                  price: 37.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
                "16": {
                  sku: "SI05359848",
                  price: 49.99,
                  meta: {
                    subscriptionDuration: null,
                  },
                },
              },
              [PRODUCT_CONSTANTS.noSubscription]: {
                "4": {
                  sku: "SI05359845",
                  price: 14.99,
                },
                "8": {
                  sku: "SI05359846",
                  price: 26.99,
                },
                "12": {
                  sku: "SI05359847",
                  price: 39.99,
                },
                "16": {
                  sku: "SI05359848",
                  price: 51.99,
                },
              },
            },
          },
          selectedPack: {
            sku: "SI05359847",
            price: 39.99,
            strength: "50",
            orderType: PRODUCT_CONSTANTS.noSubscription,
            itemsPerPack: "12",
          },
        },
        content: [
          {
            label: "Quantity",
            value: "50mg, 12 tablets",
          },
          {
            label: "Created Date",
            value: "2021-08-30",
          },
          {
            label: "Order number",
            value: "#1630318430917",
          },
        ],
      },
    ],
    status: "LOADED",
  },
};
const useSelectorMock = jest
  .spyOn(reactRedux, "useSelector")
  .mockImplementation((callback) => callback(state));
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
useDispatchMock.mockReturnValue(jest.fn());

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ orderType: "orders" }),
}));

describe("<OnlineAccountOverviewPage />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <TestProviders>
        <OnlineAccountOverviewPage />
      </TestProviders>
    );
    expect(container).toMatchSnapshot();
  });
});
