import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { addImagesToProducts } from "./helpers";

jest.mock(
  "pages/OrderProductSelectionPage/assets/sildenafil.png",
  () => "test-sildenafil-image-url"
);

jest.mock(
  "pages/OrderProductSelectionPage/assets/viagra.png",
  () => "test-viagra-image-url"
);

beforeEach(() => {
  jest.resetAllMocks();
});

const products = [
  {
    __meta__: {
      name: "Sildenafil",
      imageURI: "sildenafil",
    },
  },
  {
    __meta__: {
      name: "Viagra",
      imageURI: "viagra",
    },
  },
];

describe("helpers: addImagesToProducts", () => {
  it("should add images to products", () => {
    const finalProducts = addImagesToProducts(
      products as unknown as Array<PriceConfig>
    );
    expect(finalProducts).toStrictEqual([
      {
        __meta__: {
          name: "Sildenafil",
          imageURI: "test-sildenafil-image-url",
        },
      },
      {
        __meta__: {
          name: "Viagra",
          imageURI: "test-viagra-image-url",
        },
      },
    ]);
  });
});
