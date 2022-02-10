import React, { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { analytics } from "@welldigital/ui-common/Analytics";
import USPBanner from "../../components/USPBanner";
import {
  defaultOnlineService,
  defaultPack,
  OnlineQuestion,
  OnlineService,
  OnlineServiceIds,
  OnlineServiceParamTypes,
  Pack,
  Product,
  ProductSelectionPageQuery,
  ServiceTextValue,
  SetOnlineServiceAction,
  SetPackAction,
  SetProductAction,
  TextByServiceMap,
} from "app/store/reducer/online/types";
import {
  Button,
  Product as ProductDetails,
  ProductPack,
  Text,
} from "../../components";
import { useLocationQuery } from "../../utils/utils";
import { isHana1315Flow } from "../../utils/onlineServiceConsultation";
import { HanaTripettoQuestions } from "../../constants/hanaTripettoQuestions";
import { EdProductIds, edProductsMap } from "../../components/EdProducts";

export interface ProductSelectionStateProps {
  products: Product[];
  productToken: string | null;
  productTokenValid: boolean;
  selectedProduct: Product;
  getEligiblePacks: (product: Product) => Pack[];
  fetching: boolean;
  services: OnlineService[];
  selectedService: OnlineService;
  consultation: OnlineQuestion[];
}

export interface ProductSelectionDispatchProps {
  setPack: (data: Pack) => SetPackAction;
  fetchProducts: (onlineServiceId: string) => void;
  setProductToken: (token: string) => void;
  checkProductToken: (token: string) => void;
  setProduct: (data: Product) => SetProductAction;
  setOnlineService: (id: OnlineService) => SetOnlineServiceAction;
  setConsultation: (service: string, consultation: OnlineQuestion[]) => void;
}

export type ProductSelectionProps = ProductSelectionStateProps &
  ProductSelectionDispatchProps;

const ProductSelectionPage: React.FC<ProductSelectionProps> = ({
  setPack,
  setProduct,
  selectedProduct,
  products,
  productTokenValid,
  consultation,
  fetchProducts,
  setProductToken,
  checkProductToken,
  fetching,
  setOnlineService,
  services,
  selectedService,
  getEligiblePacks,
  setConsultation,
}) => {
  const history = useHistory();
  const { token } = useLocationQuery<ProductSelectionPageQuery>();
  const { onlineServiceId, productId } = useParams<OnlineServiceParamTypes>();
  const [productPacks, setProductPacks] = useState([defaultPack]);
  const [selectedPackSku, setPackSku] = useState<string | null>(null);

  useEffect(() => {
    analytics.trackEvent({
      flow: onlineServiceId,
      event: `View product page`,
    });
  }, [onlineServiceId]);

  useEffect(() => {
    if (!token || onlineServiceId !== OnlineServiceIds.hana) return;
    checkProductToken(token);
  }, [token, checkProductToken, onlineServiceId]);

  useEffect(() => {
    if (!token || onlineServiceId !== OnlineServiceIds.hana) return;
    if (productTokenValid) {
      setProductToken(token);
      // if the one-time link is opened in another browser, we won't have any localStorage data,
      // we need this to be recognized in confirmation page, for showing additional info section
      if (!isHana1315Flow(consultation)) {
        setConsultation(onlineServiceId, [
          {
            number: 0,
            question: HanaTripettoQuestions.q1,
            answer: "14",
            type: "int",
          },
        ]);
      }
    } else {
      history.push("/page-not-found");
    }
  }, [
    token,
    productTokenValid,
    setProductToken,
    consultation,
    setConsultation,
    history,
    onlineServiceId,
  ]);

  useEffect(() => {
    fetchProducts(onlineServiceId);
    const selectedOnlineService =
      services.find(({ id }) => id === onlineServiceId) || defaultOnlineService;
    if (selectedOnlineService !== selectedService) {
      setOnlineService(selectedOnlineService);
    }
  }, [
    setOnlineService,
    fetchProducts,
    onlineServiceId,
    services,
    selectedService,
  ]);

  useEffect(() => {
    if (!fetching && products.length > 0) {
      let product;
      if (onlineServiceId === OnlineServiceIds.ed) {
        product = products.find(({ id }) => id === productId);
      } else {
        product = products[0];
      }
      if (!product) return;
      setProduct(product);
      setProductPacks(getEligiblePacks(product));
    }
  }, [
    fetching,
    products,
    setProductPacks,
    setProduct,
    getEligiblePacks,
    onlineServiceId,
    productId,
  ]);

  const continueToCheckout = () => {
    if (!selectedPackSku) return;
    const selectedPack = productPacks.find(
      ({ sku }) => selectedPackSku === sku
    );
    if (!selectedPack) return;
    setPack(selectedPack);
    analytics.trackEvent({
      flow: onlineServiceId,
      event: "Selected pack size",
      metadata: {
        product: selectedPack,
      },
    });
    history.push(`/online/${onlineServiceId}/checkout/your-details`);
  };

  const isEd = onlineServiceId === OnlineServiceIds.ed;
  const productText: ServiceTextValue = TextByServiceMap[onlineServiceId];
  return (
    <Container maxWidth={"xs"} disableGutters>
      <Text variant={"beforeTitle"}>{productText.beforeTitle}</Text>
      <Text variant={"title"}>{productText.title}</Text>
      <Text variant={"paragraph"}>{productText.info1}</Text>
      {isEd ? (
        <Box marginBottom={5}>
          <ProductDetails
            {...edProductsMap[productId as unknown as EdProductIds]}
          />
        </Box>
      ) : (
        <>
          <Text variant={"label"}>{selectedProduct.name}</Text>
          {!!productText.info2 && (
            <Text variant={"paragraph"}>{productText.info2}</Text>
          )}
          <USPBanner product={selectedProduct} />
        </>
      )}

      <Box marginTop={4} marginBottom={3}>
        <Text variant={"label"}>Select a pack size</Text>
        {fetching ? (
          <div>Loading...</div>
        ) : (
          productPacks.map((pack, k) => (
            <ProductPack
              key={k}
              {...pack}
              checked={pack.sku === selectedPackSku}
              onCheck={() => setPackSku(pack.sku)}
            />
          ))
        )}
      </Box>

      {isEd && <USPBanner product={selectedProduct} />}

      <Box marginTop={5}>
        <Button
          data-testid={"ProductSelectionPage/continue-button"}
          variant={"formNext"}
          onClick={continueToCheckout}
          disabled={!selectedPackSku}
          children={"Continue to checkout"}
        />
      </Box>
    </Container>
  );
};

export default ProductSelectionPage;
