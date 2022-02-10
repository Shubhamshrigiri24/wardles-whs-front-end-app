import React from "react";
import { render } from "@testing-library/react";
import {
  ProductModal,
  ProductModalProps,
  ModalType,
} from "pages/OrderProductSelectionPage/components/ProductModal";
import userEvent from "@testing-library/user-event";
import { PRODUCT_CONSTANTS } from "constants/product";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";

const mockedProduct: PriceConfig = {
  __meta__: {
    id: "product_id",
    productName: "product_name",
    activeIngredient: "active_ingredient",
    imageURI: "image_uri",
    worksIn: "69 min",
    duration: "24 hrs",
    isBestValue: true,
    description: "product_description",
    moreInfo: [
      {
        title: "more_info_title",
        content: "more_infro_content",
      },
    ],
    subscriptionMoreInfo: "subscription_more_info",
    priceTemplate: "",
    defaultPricePath: ["50", PRODUCT_CONSTANTS.subscription, "16"],
    levels: [
      {
        renderOrder: 0,
        levelLabel: "Strength",
        columnLabelTemplate: "",
      },
    ],
  },
  priceTree: {
    50: {
      [PRODUCT_CONSTANTS.subscription]: {
        4: {
          sku: "123456",
          price: 17.99,
          meta: { subscriptionDuration: Infinity },
        },
      },
      [PRODUCT_CONSTANTS.noSubscription]: {
        4: {
          sku: "123456",
          price: 19.99,
        },
      },
    },
  },
};

const mockOnClose = jest.fn();
const mockOnSelect = jest.fn();
const mockOnContinue = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

const makeProps = (props: Partial<ProductModalProps>): ProductModalProps => ({
  open: true,
  modalType: ModalType.MORE_INFO,
  product: mockedProduct,
  onClose: mockOnClose,
  onSelect: mockOnSelect,
  isContinueButtonEnabled: true,
  onContinue: mockOnContinue,
  ...props,
});

const renderProductModal = () => render(<ProductModal {...makeProps({})} />);

const productMeta = mockedProduct.__meta__;

describe("<ProductModal />", () => {
  describe("When the 'more info' modal is open", () => {
    it("should display the title", () => {
      const { getByText, getByAltText } = renderProductModal();

      expect(getByText(productMeta.productName)).not.toBeNull();

      const productImage = getByAltText(productMeta.productName);
      expect((productImage as HTMLImageElement).src).toContain(
        productMeta.imageURI
      );
    });

    describe('When the user clicks on the "back" button', () => {
      it("should fire the onClose action", () => {
        const { getByRole } = renderProductModal();

        userEvent.click(getByRole("button", { name: "Back" }));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the user clicks on the "select" button', () => {
      it("should fire the onSelect action", () => {
        const { getByRole } = renderProductModal();

        userEvent.click(getByRole("button", { name: "Select" }));

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("When the modal is not opened", () => {
    it("should not render anything", () => {
      const props = makeProps({ open: false });
      const { queryByText } = render(<ProductModal {...props} />);

      expect(queryByText(productMeta.productName)).toBeNull();
      expect(queryByText(productMeta.description)).toBeNull();
      expect(queryByText(productMeta.moreInfo[0].title)).toBeNull();
    });
  });
});
