import cloneDeep from "lodash/cloneDeep";
import { transformOrder } from "./helpers";

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

const order = {
  id,
  createdDate,
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

describe("helpers: transformOrder", () => {
  it("should return decorated order object", () => {
    const result = transformOrder(cloneDeep(order));

    const expectedResult = {
      ...order,
      products: [
        {
          ...order.products[0],
          product: {
            ...order.products[0].product,
            productInfo: {
              ...order.products[0].product.productInfo,
              imageURI: "test-sildenafil-image-url",
            },
          },
        },
        ...order.products.slice(1),
      ],
      type: "order",
      typeLabel: "Individual order",
      title: productName,
      content: [
        {
          label: "Created Date",
          value: createdDate,
        },
        {
          label: "Quantity",
          value: `${strength}mg ${itemsPerPack} tablets`,
        },

        { label: "Order number", value: `#${id}` },
      ],
    };

    expect(result).toEqual(expectedResult);
  });
});
