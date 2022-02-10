import cloneDeep from "lodash/cloneDeep";
import { transformSubscription } from "./helpers";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";

jest.mock(
  "pages/OrderProductSelectionPage/assets/sildenafil.png",
  () => "test-sildenafil-image-url"
);

beforeEach(() => {
  jest.resetAllMocks();
});

const id = "12345678910";
const productName = "Sildenafil";
const itemsPerPack = 16;
const strength = "50";
const createdDate = "2021-09-10";
const nextOrderDate = "2021-10-10";
const status = "ACTIVE";
const NO_DATE_AVAILABLE = "No Date Available";

const subscription = {
  id,
  createdDate,
  nextOrderDate,
  status,
  products: [
    {
      product: {
        itemsPerPack,
        productInfo: {
          productName,
          imageURI: "sildenafil",
        },
        meta: {
          strength,
        },
      },
    },
  ],
};

const sharedExpectedResult = {
  ...subscription,
  products: [
    {
      ...subscription.products[0],
      product: {
        ...subscription.products[0].product,
        productInfo: {
          ...subscription.products[0].product.productInfo,
          imageURI: "test-sildenafil-image-url",
        },
      },
    },
    ...subscription.products.slice(1),
  ],
  type: "subscription",
  typeLabel: "Subscription",
  title: productName,
};

describe("helpers: transformSubscription", () => {
  it("should return decorated subscription object", () => {
    const result = transformSubscription(cloneDeep(subscription));
    expect(result).toStrictEqual({
      ...sharedExpectedResult,
      status: SUBSCRIPTION_STATUSES[status],
      content: [
        {
          label: "Start Date",
          value: createdDate,
        },
        {
          label: "Renewal Date",
          value: nextOrderDate,
        },
        {
          label: "Status",
          value: SUBSCRIPTION_STATUSES[status],
          valueHighlight: false,
        },
        {
          label: "Quantity",
          value: `${strength}mg ${itemsPerPack} tablets`,
        },
      ],
    });
  });

  it(`should return  ${NO_DATE_AVAILABLE} for Renewal Date if status = CANCELED`, () => {
    const canceledStatus = "CANCELLED";
    const result = transformSubscription({
      ...cloneDeep(subscription),
      status: canceledStatus,
    });

    expect(result).toStrictEqual({
      ...sharedExpectedResult,
      status: SUBSCRIPTION_STATUSES[canceledStatus],
      content: [
        {
          label: "Start Date",
          value: createdDate,
        },
        {
          label: "Renewal Date",
          value: NO_DATE_AVAILABLE,
        },
        {
          label: "Status",
          value: SUBSCRIPTION_STATUSES[canceledStatus],
          valueHighlight: true,
        },
        {
          label: "Quantity",
          value: `${strength}mg ${itemsPerPack} tablets`,
        },
      ],
    });
  });
});
