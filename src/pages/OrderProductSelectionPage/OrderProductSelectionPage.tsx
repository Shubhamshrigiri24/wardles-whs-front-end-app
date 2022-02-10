import React, { useCallback, useState, useEffect } from "react";
import classNames from "clsx";
import { Container } from "@material-ui/core";
import { ALL_STEPS, Stepper, StepperSteps } from "components/Stepper";
import { Alert, Button } from "@welldigital/components";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  Column,
  PriceConfig,
  ReliablePricePath,
} from "@welldigital/ui-common/Components/PSProductDetail/types";
import { ProductList } from "./components/ProductList";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import {
  ModalType,
  ProductModal,
} from "pages/OrderProductSelectionPage/components/ProductModal";
import ProductsApi from "utils/api/ProductsAPI";
import { addImagesToProducts } from "utils/api/helpers";
import { useStyles } from "./styles";

import { Loader } from "components";
import { AugmentedPrice } from "@welldigital/ui-common/Components/PSProductDetail/helpers";
import { useHistory, useParams } from "react-router-dom";
import {
  defaultOnlineService,
  OnlineQuestion,
  OnlineService,
  OnlineServiceParamTypes,
  Pack,
  SetOnlineServiceAction,
  SetPackAction,
} from "../../app/store/reducer/online/types";
import { findProductAndChoiceBySKU } from "./utils/helpers";
import { analytics } from "@welldigital/ui-common/Analytics";
import events, { eventsBuilder } from "../../utils/events";
import { Product } from "../../app/store/reducer/order/types";
import { SetProductActionType } from "../../app/store/reducer/order/types";
import { PRODUCT_CONSTANTS } from "../../constants/product";
import { SelectedProductInfoContent } from "./components/SelectedProductContent/SelectedProductInfoContent";
import { PSProductDetail } from "@welldigital/ui-common/Components/PSProductDetail";

export type SelectedProductVariant = {
  pricePath: ReliablePricePath;
  column: Column;
  price: AugmentedPrice & { noSubDiscount?: boolean };
  priceConfig: PriceConfig;
};

export interface OrderProductSelectionDispatchProps {
  setPack: (data: Pack) => SetPackAction;
  setProduct: (data: Product) => SetProductActionType;
  setOnlineService: (id: OnlineService) => SetOnlineServiceAction;
}
export interface OrderProductSelectionStateProps {
  services: OnlineService[];
  selectedService: OnlineService;
  consultation: OnlineQuestion[];
}

export type OrderProductSelectionPageProps = OrderProductSelectionStateProps &
  OrderProductSelectionDispatchProps;

const buyLinkURL = "/login-options?redirect=/order/ed/account-details";

export const OrderProductSelectionPage: React.FC<OrderProductSelectionPageProps> =
  ({ setPack, setProduct, setOnlineService, services, selectedService }) => {
    const [products, setProducts] = useState<Array<PriceConfig>>([]);
    const [isFetchingProducts, setIsFetchingProdutcs] = useState<boolean>(true);
    const [fetchingProductsError, setFetchingProductsError] =
      useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<PriceConfig | null>(
      null
    );
    const [selectedProductVariant, setSelectedProductVariant] =
      useState<SelectedProductVariant | null>(null);
    const { onlineServiceId } = useParams<OnlineServiceParamTypes>();
    const history = useHistory();
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const fetchProducts = useCallback(async () => {
      try {
        setIsFetchingProdutcs(true);
        const payload = await ProductsApi.getProducts();
        setProducts(addImagesToProducts(payload.data));
      } catch (err) {
        console.error(err);
        setFetchingProductsError("Error on showing products!");
      } finally {
        setIsFetchingProdutcs(false);
      }
    }, []);

    useEffect(() => {
      fetchProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const selectedOnlineService =
        services.find(({ id }) => id === onlineServiceId) ||
        defaultOnlineService;
      if (selectedOnlineService !== selectedService) {
        setOnlineService(selectedOnlineService);
      }
    }, [onlineServiceId, services, selectedService, setOnlineService]);

    const openMoreInfoModal = useCallback((product: PriceConfig | null) => {
      setSelectedProduct(product);
      setModalType(ModalType.MORE_INFO);
    }, []);

    const openDetailsModal = useCallback(
      (product: PriceConfig | null) => {
        setSelectedProduct(product);
        setModalType(ModalType.DETAILS);

        analytics.trackEvent({
          flow: onlineServiceId,
          event: eventsBuilder.productSelect.productCardSelectButton(
            product?.__meta__?.productName
          ),
        });
      },
      [onlineServiceId]
    );

    const closeModal = useCallback(() => {
      setSelectedProduct(null);
    }, []);

    const displayProductDetails = useCallback(
      (product: PriceConfig | null) => {
        setModalType(null);
        setSelectedProduct(product);

        analytics.trackEvent({
          flow: onlineServiceId,
          event: eventsBuilder.productSelect.productCardSelectButton(
            product?.__meta__?.productName
          ),
        });
      },
      [onlineServiceId]
    );

    const onSubscriptionViewMoreToggle = useCallback(
      (isExpanded) => {
        if (isExpanded) {
          analytics.trackEvent({
            flow: onlineServiceId,
            event: eventsBuilder.productSelect.seeMoreAboutSubscription,
          });
        }
      },
      [onlineServiceId]
    );

    const onPricePathChanged = useCallback(
      (
        pricePath: ReliablePricePath,
        column: Column,
        price: AugmentedPrice,
        priceConfig: PriceConfig
      ) => {
        const { columnValue } = column;
        setSelectedProductVariant({
          pricePath,
          column,
          price,
          priceConfig,
        });

        analytics.trackEvent({
          flow: onlineServiceId,
          event: eventsBuilder.productSelect.packSelected(
            priceConfig.__meta__.productName,
            pricePath[0],
            pricePath[2],
            pricePath[1] === "Subscription"
          ),
        });

        let event = "";
        if (columnValue === PRODUCT_CONSTANTS.subscription) {
          event = events.order.tapOnSubscription;
        }
        if (columnValue === PRODUCT_CONSTANTS.noSubscription) {
          event = events.order.tapOnNoSubscription;
        }

        if (event) {
          analytics.trackEvent({
            flow: onlineServiceId,
            event,
            metadata: {
              product: {
                sku: price.sku,
                productName: priceConfig.__meta__.productName,
                strength: pricePath[0],
                packSize: pricePath[pricePath.length - 1],
              },
            },
          });
        }
      },
      [onlineServiceId]
    );

    const continueWithSelectedProduct = useCallback(() => {
      const {
        column,
        priceConfig,
        pricePath,
        price: augmentedPrice,
      } = selectedProductVariant!;

      const {
        sku,
        price,
        units: itemsPerPack,
        pricePerUnit,
        meta,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        noSubDiscount,
      } = augmentedPrice;
      const { __meta__: productMeta } = priceConfig;
      const { hasBestValue: isBestValue } = column;
      const hasSubscription = !!meta?.subscriptionDuration;

      // we need to search for the "no-subscription" level of the tree to find the total price of the pack in order to be able to calculate discount because the price from product selection widget (in case of subscription have discount applied, and in case of "no subscription" is full price and we dont care about discount)
      const { selectedPack } = findProductAndChoiceBySKU(sku, products, false);

      const constructedPack: Pack = {
        isBestValue,
        itemsPerPack: +itemsPerPack,
        label: `${itemsPerPack} tablets`,
        name: productMeta.productName,
        basePrice: selectedPack.price,
        price,
        pricePerUnit,
        sku,
        delivery: {
          type: "FREE",
          price: 0,
        },
        ...(hasSubscription && !noSubDiscount
          ? {
              discounts: [
                {
                  code: "subscription",
                  type: "percentage",
                  discountInfo: 10,
                  discountAmount: selectedPack.price - price,
                  priceWithDiscount: price,
                },
              ],
            }
          : { discounts: [] }),
      };

      analytics.trackEvent({
        flow: onlineServiceId,
        event: hasSubscription
          ? events.order.selectProductWithSubscription
          : events.order.selectProductWithoutSubscription,
        metadata: {
          product: {
            sku: augmentedPrice.sku,
            productName: productMeta.productName,
            strength: pricePath[0],
            packSize: itemsPerPack,
            subscription: hasSubscription ? "YES" : "NO",
          },
        },
      });

      analytics.trackEvent({
        flow: onlineServiceId,
        event: eventsBuilder.productSelect.choseProduct,
        metadata: {
          product: {
            sku: augmentedPrice.sku,
            productName: productMeta.productName,
            strength: pricePath[0],
            packSize: itemsPerPack,
            subscription: hasSubscription
              ? "with subscription"
              : "without subscription",
          },
        },
      });

      if (hasSubscription) {
        analytics.trackEvent({
          flow: onlineServiceId,
          event: eventsBuilder.productSelect.choseProduct,
          metadata: {
            product: {
              sku: augmentedPrice.sku,
              productName: productMeta.productName,
              packSize: itemsPerPack,
            },
          },
        });
      }

      setProduct({
        id: productMeta.id,
        name: productMeta.productName,
        service: "ed",
        packs: [constructedPack],
        variant: productMeta.levels[0].columnLabelTemplate.replace(
          "<value>",
          pricePath[0]
        ),
        subscription: hasSubscription,
        image: productMeta.imageURI,
      });

      setPack(constructedPack);

      history.push(buyLinkURL);
    }, [
      onlineServiceId,
      history,
      products,
      setPack,
      setProduct,
      selectedProductVariant,
    ]);

    const classes = useStyles();

    const selectedProductInfoContent = selectedProduct && (
      <SelectedProductInfoContent product={selectedProduct} />
    );
    const selectedProductDetailsContent = selectedProduct && (
      <PSProductDetail
        priceConfig={selectedProduct}
        onPricePathChanged={onPricePathChanged}
        onSubscriptionViewMoreToggle={onSubscriptionViewMoreToggle}
      />
    );

    const modalContent =
      modalType === ModalType.MORE_INFO
        ? selectedProductInfoContent
        : modalType === ModalType.DETAILS
        ? selectedProductDetailsContent
        : null;

    return (
      <GeneralLayout>
        <Container
          maxWidth={"lg"}
          className={classNames(classes.pageContainer)}
        >
          {fetchingProductsError && !isFetchingProducts && (
            <Alert
              message={fetchingProductsError}
              type={"error"}
              onClose={fetchProducts}
              closeLabel={"Retry"}
            />
          )}
          {isFetchingProducts && (
            <div className={classes.contentLoader}>
              <Loader />
            </div>
          )}
          {!isFetchingProducts && !fetchingProductsError && (
            <>
              <Stepper
                steps={ALL_STEPS}
                currentStep={StepperSteps.PRODUCT_SELECTION}
              />
              <div className={classNames(classes.pageTitle)}>
                Here are your treatment options
              </div>
              <div className={classNames(classes.pageHeadText)}>
                Thanks for completing your online consultation. Please select
                your treatment from the options below. <br />
                If you need any help or more information, email{" "}
                <span style={{ color: "#0061F2" }}>hello@well.co.uk.</span>
              </div>
              <ProductList
                products={products}
                selectedProduct={selectedProduct}
                onSeeMoreInfoMobile={openMoreInfoModal}
                onSelectMobile={openDetailsModal}
                onSelectLargeScreen={displayProductDetails}
              />
              {!!modalType && (
                <ProductModal
                  open={selectedProduct !== null}
                  fullScreen
                  product={selectedProduct}
                  modalType={modalType}
                  onClose={closeModal}
                  onSelect={() => openDetailsModal(selectedProduct)}
                  onContinue={continueWithSelectedProduct}
                  isContinueButtonEnabled={!!selectedProductVariant}
                >
                  {modalContent}
                </ProductModal>
              )}
            </>
          )}
          {selectedProduct && (
            <div
              id={"large-screen-selected-product-content"}
              className={classNames(classes.largeScreenSelectedProductWrapper)}
              data-testid={"product-select/large-screen-selected/content"}
            >
              <div
                className={classNames(
                  classes.largeScreenSelectedProductWrapperInner
                )}
              >
                <div
                  className={classNames(
                    classes.largeScreenSelectedProductInfoContainer
                  )}
                  data-testid={
                    "product-select/large-screen-selected/product-info"
                  }
                >
                  <div
                    className={classNames(
                      classes.largeScreenSelectedProductInfoTitle
                    )}
                    data-testid={
                      "product-select/large-screen-selected/product-info-title"
                    }
                  >
                    {selectedProduct.__meta__.productName}
                  </div>
                  {selectedProductInfoContent}
                </div>
                <div
                  className={classNames(
                    classes.largeScreenSelectedProductDetailsContainer
                  )}
                >
                  {selectedProductDetailsContent}
                  <div
                    className={classNames(
                      classes.largeScreenSelectedProductDetailsSubmitButton
                    )}
                  >
                    <Button
                      fullWidth
                      disabled={!selectedProductVariant}
                      onClick={continueWithSelectedProduct}
                      color={"primary"}
                      endIcon={<ChevronRight />}
                      data-testid={
                        "product-select/large-screen-selected/continue-button"
                      }
                    >
                      Continue to checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </GeneralLayout>
    );
  };

export default OrderProductSelectionPage;
