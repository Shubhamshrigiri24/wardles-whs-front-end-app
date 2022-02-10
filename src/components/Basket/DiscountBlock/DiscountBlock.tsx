import React, { useCallback, useEffect, useState } from "react";
import { useLocation, generatePath } from "react-router-dom";
import clsx from "clsx";
import {
  Typography,
  Input,
  Button,
  Spacing,
  wellColors,
} from "@welldigital/components";
import { Box, Grid } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { ORDER_PAYMENT_PATH } from "constants/paths";
import { formatPrice } from "utils/formatters";
import DiscountsAPI, { ValidationRequestBody } from "utils/api/DiscountsAPI";
import { Discount } from "app/store/reducer/order/types";
import { useProduct, useSetProduct } from "app/store/hooks";
import { useStyles } from "components/Basket/styles";
import { eventsBuilder } from "utils/events";
import { analytics } from "@welldigital/ui-common";

export type DiscountBlockProps = {};

const MESSAGE_MAX_DISPLAY_TIME_IN_MS = 30000;

export const DiscountBlock: React.FC<DiscountBlockProps> = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const product = useProduct();
  const setProduct = useSetProduct();
  const classes = useStyles();

  const discounts = product?.packs[0].discounts;
  const productSku = product?.packs[0].sku;
  const isSubscription = product?.subscription;
  const discountCodes = discounts?.filter(
    (discount) => discount.code !== "subscription"
  );

  const isPaymentPage =
    location.pathname ===
    generatePath(ORDER_PAYMENT_PATH, { onlineServiceId: "ed" });

  const handleDiscountCodeChange = useCallback(
    (code: string) => setValue(code),
    []
  );

  const validateDiscounts = useCallback(
    async (code?: string) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const body: ValidationRequestBody = {
          basket: [{ sku: productSku, quantity: 1 }],
          ...(code ? { discountCodes: [code] } : {}),
          subscription: product?.subscription,
        };
        const response = await DiscountsAPI.validateCode(body);
        const data: Discount = response.data;

        const appliedDiscount = data.discounts?.find(
          (discount) => discount.code === code
        );

        product &&
          setProduct({
            ...product,
            packs: [
              {
                ...product.packs[0],
                basePrice: data.initial,
                price: data.final,
                discounts: (data.discounts ?? []).map((discount) => ({
                  code: discount.code,
                  type: discount.type,
                  discountInfo: discount.amount,
                  discountAmount: discount.calculated.value,
                  priceWithDiscount: discount.calculated.final,
                })),
              },
            ],
          });

        setValue("");
        appliedDiscount &&
          setSuccessMessage(
            `${
              appliedDiscount.type === "percentage"
                ? `${appliedDiscount.amount}%`
                : `£${appliedDiscount.amount}`
            } discount has been applied to your basket.${
              isSubscription
                ? " This code is only valid for the first month of your subscription."
                : ""
            }`
          );

        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.basket.discountApplied,
          metadata: {
            code,
          },
        });
      } catch (err) {
        const statusCode = (err as { response: Response }).response.status;

        if (code) {
          setErrorMessage(
            `${
              statusCode === 400
                ? "This discount code can’t be used with items in your basket."
                : "Invalid discount code. Please try again."
            }`
          );
        } else {
          setErrorMessage("An error occured. Please try again.");
        }

        analytics.trackEvent({
          flow: "ed",
          event: eventsBuilder.basket.discountFailed,
          metadata: {
            code,
            error: err,
          },
        });
      }
      setIsLoading(false);
    },
    [product, isSubscription, productSku, setProduct]
  );

  const handleAddDiscountCode = useCallback(async () => {
    if (value.length === 0) {
      setSuccessMessage("");
      setErrorMessage("Invalid discount code. Please try again.");
      return;
    }
    if (discountCodes && discountCodes.length > 0) {
      setSuccessMessage("");
      setErrorMessage("Only one discount code can be applied to your basket.");
      return;
    }

    await validateDiscounts(value);
  }, [discountCodes, value, validateDiscounts]);

  const handleRemoveDiscountCode = useCallback(async () => {
    setSuccessMessage("");
    setErrorMessage("");
    await validateDiscounts();
  }, [validateDiscounts]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage("");
      }, MESSAGE_MAX_DISPLAY_TIME_IN_MS);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
      }, MESSAGE_MAX_DISPLAY_TIME_IN_MS);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage]);

  const Subtotal: React.FC<{ amount: number }> = ({ amount }) => {
    return (
      <Grid
        container
        wrap={"nowrap"}
        justify={"space-between"}
        className={classes.subtotalWrapper}
      >
        <Typography className={classes.discountSubtotal}>Subtotal</Typography>
        <Typography className={classes.discountSubtotal}>
          {formatPrice(amount)}
        </Typography>
      </Grid>
    );
  };

  return (
    <Box marginTop={3}>
      {isSubscription &&
        product?.packs?.[0].discounts?.[0]?.code === "subscription" && (
          <Box>
            <Typography
              variant={"subtitle1"}
              spacingAfter={1}
              className={classes.defaultText}
            >
              Subscription discount
            </Typography>
            <div className={classes.discountRow}>
              <Box display={"flex"} alignItems={"center"}>
                <LocalOfferIcon
                  classes={{ root: classes.promoIcon }}
                  fontSize={"small"}
                />
                <Typography
                  variant={"subtitle2"}
                  component={"span"}
                  spacingAfter={0}
                  classes={{ root: classes.detailsText }}
                >
                  Monthly saving
                </Typography>
              </Box>
              <Typography className={classes.discountValue}>
                <span className={classes.detailsText}>
                  -
                  {formatPrice(
                    product?.packs?.[0].discounts?.[0].discountAmount ?? 0
                  )}
                </span>
                <span className={classes.iconPlaceholder}></span>
              </Typography>
            </div>

            {discountCodes && discountCodes.length > 0 ? (
              <Subtotal
                amount={product.packs[0].discounts[0].priceWithDiscount}
              />
            ) : (
              <Spacing spacing={4} />
            )}
          </Box>
        )}

      {discountCodes && discountCodes.length > 0 && (
        <Box marginBottom={4}>
          <Typography
            variant={"subtitle1"}
            spacingAfter={1}
            className={classes.defaultText}
          >
            Discounts
          </Typography>
          {discountCodes.map(
            (
              { code, type, discountInfo, discountAmount, priceWithDiscount },
              index
            ) => (
              <React.Fragment key={code}>
                <div className={classes.discountRow}>
                  <Box display={"flex"} alignItems={"center"}>
                    <LocalOfferIcon
                      classes={{ root: classes.promoIcon }}
                      fontSize={"small"}
                    />
                    <Typography
                      variant={"subtitle2"}
                      component={"span"}
                      spacingAfter={1}
                      classes={{ root: classes.detailsText }}
                    >
                      {`${code}: ${
                        type === "percentage"
                          ? `${discountInfo}%`
                          : `£${discountInfo}`
                      } off`}
                    </Typography>
                  </Box>
                  <Typography className={classes.discountValue}>
                    <span>{formatPrice(discountAmount)}</span>
                    {isPaymentPage ? (
                      <span className={classes.iconPlaceholder}></span>
                    ) : (
                      <CloseIcon
                        fontSize={"small"}
                        className={classes.discountRemoveIcon}
                        onClick={handleRemoveDiscountCode}
                        data-testid={`basket/remove-${index + 1}`}
                      />
                    )}
                  </Typography>
                </div>
                {index !== discountCodes.length - 1 && (
                  <Subtotal amount={priceWithDiscount} />
                )}
              </React.Fragment>
            )
          )}
        </Box>
      )}

      {!isPaymentPage && (
        <Input
          fullWidth
          label={"Enter new code"}
          disabled={isLoading}
          value={value}
          onChange={handleDiscountCodeChange}
          inputProps={{
            "data-testid": "basket/discount-code-input",
          }}
        />
      )}
      {!!errorMessage && !isPaymentPage && (
        <div className={classes.messageWrapper}>
          <p className={clsx(classes.discountMessage, classes.errorMessage)}>
            <ErrorOutlineIcon fontSize={"small"} style={{ marginTop: "3px" }} />
            <Box component={"span"} paddingLeft={1}>
              {errorMessage}
            </Box>
          </p>
        </div>
      )}
      {!!successMessage && !isPaymentPage && (
        <div className={classes.messageWrapper}>
          <p className={clsx(classes.discountMessage, classes.successMessage)}>
            <CheckIcon fontSize={"small"} style={{ marginTop: "3px" }} />
            <Box component={"span"} paddingLeft={1}>
              {successMessage}
            </Box>
          </p>
        </div>
      )}
      {!isPaymentPage && (
        <Box marginTop={3}>
          <Button
            fullWidth
            size={"small"}
            onClick={handleAddDiscountCode}
            disabled={isLoading}
          >
            <Typography style={{ color: wellColors.zen[500] }}>
              Apply discount
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DiscountBlock;
