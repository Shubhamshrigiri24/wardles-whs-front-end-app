import React, { FC, useState, useCallback } from "react";
import { useLocation, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Spacing } from "@welldigital/components";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Grid,
  Collapse,
  useMediaQuery,
  Box,
  Divider,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import ExpandMore from "@material-ui/icons/ExpandMore";
import { formatPrice } from "utils/formatters";
import { OrderProduct } from "app/store/reducer/order/types";
import { getProduct } from "app/store/reducer/order/selectors";
import { RootState } from "app/store/types";
import { DiscountBlock } from "components/Basket/DiscountBlock";
import { DeliveryStatus } from "components/Basket/DeliveryStatus";
import { DELIVERY_LABELS_BY_TYPE } from "constants/product";
import { ORDER_PAYMENT_PATH, ACCOUNT_DETAILS_PATH } from "constants/paths";
import { useStyles } from "components/Basket/styles";

type BasketProps = {
  shouldSuppressDeliveryInfo?: boolean;
};

const Basket: FC<BasketProps> = ({ shouldSuppressDeliveryInfo = false }) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const product: OrderProduct = useSelector((state: RootState) => {
    return getProduct(state || {});
  });
  const hasDiscounts =
    product?.packs[0]?.discounts && product?.packs[0]?.discounts.length > 0;

  const deliveryType: keyof typeof DELIVERY_LABELS_BY_TYPE | undefined =
    product?.packs[0]?.delivery?.type;

  const isDetailsPage =
    location.pathname ===
    generatePath(ACCOUNT_DETAILS_PATH, { onlineServiceId: "ed" });

  const isPaymentPage =
    location.pathname ===
    generatePath(ORDER_PAYMENT_PATH, { onlineServiceId: "ed" });

  const shouldAddDelivery =
    (isDetailsPage || isPaymentPage) && !shouldSuppressDeliveryInfo;

  const handleCollapse = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const renderEmptyState = () => (
    <Typography
      variant={"subtitle2"}
      spacingAfter={0}
      classes={{ root: classes.detailsText }}
    >
      You must select a product.
    </Typography>
  );
  const renderProduct = (productPaylod: OrderProduct) => (
    <>
      <Box paddingBottom={2} className={classes.productSummary}>
        <Grid container wrap={"nowrap"}>
          <img
            className={classes.image}
            src={productPaylod?.image as string}
            alt={"product"}
          />

          <Grid item style={{ flex: 1 }}>
            <Grid container justify={"space-between"} wrap={"nowrap"}>
              <Typography className={classes.defaultText}>
                {productPaylod?.name} {productPaylod?.variant},{" "}
                {productPaylod?.packs[0].label}
              </Typography>
              <Typography
                className={classes.defaultText}
                style={{ paddingLeft: "10px" }}
              >
                {formatPrice(productPaylod?.packs[0].basePrice ?? 0)}
              </Typography>
            </Grid>
            {productPaylod?.subscription &&
            productPaylod?.packs?.[0]?.discounts &&
            productPaylod?.packs?.[0]?.discounts.length === 0 ? (
              <Typography className={classes.defaultText}>
                Monthly subscription
              </Typography>
            ) : (
              <Spacing spacing={1} />
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <DiscountBlock />
      </Box>

      {/*@ts-ignore */}
      {shouldAddDelivery && productPaylod?.packs[0]?.delivery && (
        <>
          {!hasDiscounts && isPaymentPage ? null : (
            <>
              <Spacing spacing={3} />
              <Divider />
              <Spacing spacing={3} />
            </>
          )}
          <DeliveryStatus
            label={DELIVERY_LABELS_BY_TYPE[deliveryType!]}
            value={
              deliveryType !== "FREE"
                ? //@ts-ignore
                  formatPrice(productPaylod?.packs[0]?.delivery.price)
                : "Free"
            }
            Icon={LocalShippingIcon}
            uniform
          />
        </>
      )}

      <Box marginTop={3}>
        <Divider classes={{ root: classes.dividerDark }} />
      </Box>

      <Box className={classes.totalWrapper}>
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={6}>
            <Typography
              variant={"h4"}
              spacingAfter={0}
              classes={{ root: classes.darkColor }}
              style={{ fontWeight: 700 }}
            >
              Total to pay
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant={"h2"}
              align={"right"}
              spacingAfter={0}
              classes={{
                root: clsx(classes.darkColor, classes.totalPrice),
              }}
            >
              {formatPrice(
                (productPaylod?.packs[0].price ?? 0) +
                  (shouldAddDelivery
                    ? // @ts-ignore
                      productPaylod?.packs[0]?.delivery?.price ?? 0
                    : 0)
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  return (
    <Box>
      <Card classes={{ root: classes.card }}>
        <CardContent classes={{ root: classes.cardContent }}>
          <Collapse
            in={isDesktop ? true : isOpen}
            timeout={"auto"}
            collapsedHeight={"32px"}
          >
            <Box
              className={clsx(classes.titleWrapper, {
                [classes.hasAction]: !isDesktop,
              })}
              onClick={!isDesktop ? handleCollapse : undefined}
            >
              <Box display={"flex"} alignItems={"center"}>
                <ShoppingCartIcon className={classes.titleIcon} />
                <Typography
                  variant={"h3"}
                  classes={{ root: classes.darkColor }}
                >
                  Basket summary
                </Typography>
              </Box>
              {!isDesktop && (
                <ExpandMore
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isOpen,
                  })}
                />
              )}
            </Box>
            {product && renderProduct(product)}
            {!product && renderEmptyState()}
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Basket;
