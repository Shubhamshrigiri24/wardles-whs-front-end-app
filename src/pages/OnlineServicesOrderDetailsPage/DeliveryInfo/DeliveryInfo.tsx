import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { Typography, Divider, Spacing } from "@welldigital/components";
import { formatPrice, formatStrength } from "utils/formatters";
import { Delivery } from "pages/OnlineServicesOrderDetailsPage/types";
import { DeliveryStatus } from "components/Basket/DeliveryStatus";
import { DELIVERY_LABELS_BY_TYPE } from "constants/product";
import DiscountInfo from "../DiscountInfo";
import PriceInfo from "../PriceInfo";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";

interface Props {
  delivery: Delivery;
}

export const DeliveryInfo: React.FC<Props> = ({ delivery }) => {
  const classes = useStyles();
  const { product, pricing, shouldShowDeliveryInfo } = delivery;
  const discounts = pricing?.discounts || [];
  const hasDiscounts = discounts.length > 0;

  const deliveryStatusProps = {
    label: DELIVERY_LABELS_BY_TYPE[pricing.delivery?.code ?? "FREE"],
    value:
      pricing.delivery?.code && pricing.delivery?.code !== "FREE"
        ? formatPrice(pricing.delivery?.value!)
        : "Free",
  };

  return (
    <>
      <Typography className={classes.subTitle} spacingAfter={2}>
        Delivery details
      </Typography>
      <Typography className={classes.deliveryName} spacingAfter={2}>
        {`${delivery.firstName} ${delivery.lastName}`}
      </Typography>
      <Grid container className={classes.paragraph}>
        <Grid item xs={12} sm={4}>
          <Typography>{delivery.addressline1}</Typography>
          {delivery.addressline2 && (
            <Typography>{delivery.addressline2}</Typography>
          )}
          <Typography>{delivery.city}</Typography>
          <Typography>{delivery.postcode}</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography spacingAfter={1}>{delivery.email}</Typography>
          <Typography>{delivery.phone}</Typography>
        </Grid>
      </Grid>
      <Divider spacingAfter={3} spacingBefore={3} />
      <Grid container justify={"space-between"} wrap={"nowrap"}>
        <Grid item>
          <Typography
            className={classes.subTitle}
            spacingAfter={hasDiscounts ? 1 : 0}
          >
            {product?.productInfo.productName}{" "}
            {formatStrength(product?.meta.strength)} {product?.itemsPerPack}{" "}
            tablets
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.subTitle}>
            {formatPrice(pricing.initial)}
          </Typography>
        </Grid>
      </Grid>
      {hasDiscounts &&
        discounts.map((discount, index) => (
          <Fragment key={index}>
            <DiscountInfo
              title={
                discount.code === "subscription"
                  ? "Subscription discount"
                  : "Discount code"
              }
              label={
                discount.code === "subscription"
                  ? "Monthly saving"
                  : `${discount.code}: ${
                      discount.type === "percentage"
                        ? `${discount.amount}%`
                        : `£${discount.amount}`
                    } off`
              }
              price={`-${formatPrice(discount.calculated.value)}`}
            />
            {index !== discounts.length - 1 && (
              <PriceInfo
                label={"Sub total"}
                highlightLabel
                price={`${formatPrice(discount.calculated.final)}`}
              />
            )}
          </Fragment>
        ))}
      {shouldShowDeliveryInfo && (
        <>
          <Spacing spacing={2} />
          <DeliveryStatus {...deliveryStatusProps} />
        </>
      )}
      <PriceInfo
        label={"Total"}
        highlightLabel
        highlightPrice
        price={`${formatPrice(pricing.final)}`}
      />
    </>
  );
};

export default DeliveryInfo;
