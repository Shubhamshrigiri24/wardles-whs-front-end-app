import React, { FC, useState, useEffect } from "react";
import clsx from "clsx";
import { Typography, Spacing, Button } from "@welldigital/components";
import { Container, Divider } from "@material-ui/core";
import OrderSummaryCard, {
  SummaryCardInfoType,
} from "components/OrderSummaryCard";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { analytics } from "@welldigital/ui-common/Analytics";
import { eventsBuilder } from "utils/events";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
  useAuthentication,
  AUTHENTICATED_STATE,
} from "@welldigital/ui-common/Authentication";
import { RootState } from "app/store/types";
import { OrderProduct } from "app/store/reducer/order/types";
import { CleanupOrderFlowState } from "app/store/reducer/order/actions";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";

const getOrderInfo = (product: OrderProduct): SummaryCardInfoType[][] => [
  [
    {
      label: "Payment",
      value: "Confirmed",
    },
    {
      label: "Order Number",
      value: product?.orderId ?? "",
    },
    {
      label: "Quantity",
      value: `${product?.variant?.replaceAll(" ", "")} ${
        product?.packs[0]?.itemsPerPack
      } tablets`,
    },
  ],
];

type ConfirmationData = OrderProduct & {
  orderInfo: SummaryCardInfoType[][];
};

export const OnlineServicesCheckoutConfirmationPage: FC = () => {
  const classes = useStyles();
  const { authenticatedState } = useAuthentication();
  const isAuthenticated = authenticatedState === AUTHENTICATED_STATE.YES;
  const product = useSelector((state: RootState) => state.order.product);
  const dispatch = useDispatch();

  const [confirmationData, setConfirmationData] =
    useState<ConfirmationData | null>(null);

  useEffect(() => {
    if (product) {
      setConfirmationData({
        ...product,
        orderInfo: getOrderInfo(product),
      });

      dispatch(CleanupOrderFlowState());
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (product) {
      const metadata = {
        productName: product?.name,
        productSku: product?.packs[0].sku,
        packSize: product?.packs[0].itemsPerPack,
      };

      analytics.trackEvent({
        flow: product.service,
        event: eventsBuilder.orderConfirmation.showConfirmationScreen,
        metadata,
      });

      if (product?.subscription) {
        analytics.trackEvent({
          flow: product.service,
          event: eventsBuilder.orderConfirmation.showConfirmationScreenWithSub,
          metadata: {
            ...metadata,
            subscription: `${
              product?.subscription ? "with" : "without"
            } subscription`,
          },
        });
      }
    }
  }, [product]);

  return (
    <GeneralLayout>
      <Container maxWidth={"xs"} disableGutters className={classes.pageContent}>
        {!confirmationData && (
          <Typography
            className={classes.error}
            variant={"h2"}
            spacingAfter={6}
            align={"center"}
          >
            You don't have an order yet.
          </Typography>
        )}
        {confirmationData && (
          <>
            <Typography
              className={classes.pageTitle}
              variant={"h2"}
              spacingAfter={6}
            >
              Thank you, we have received your order.
            </Typography>
            <OrderSummaryCard
              image={confirmationData?.image as string}
              name={confirmationData?.name ?? ""}
              type={
                confirmationData?.subscription
                  ? "Subscription"
                  : "Individual Order"
              }
              info={confirmationData?.orderInfo || []}
            />
            <Spacing spacing={2} />
            <Divider classes={{ root: classes.divider }} />
            <Spacing spacing={4} />
            <Typography className={classes.sectionTitle} variant={"h3"}>
              What happens next?
            </Typography>
            <Typography
              className={clsx(classes.sectionText, classes.step)}
              spacingAfter={1}
            >
              Step 1
            </Typography>
            <Typography
              className={classes.sectionTitle}
              variant={"h3"}
              spacingAfter={2}
            >
              Pharmacist approval and secure checkout
            </Typography>
            <Typography className={classes.sectionText} spacingAfter={5}>
              One of our pharmacists will review your order to make sure your
              treatment is safe and suitable for you. If your order is approved,
              we will email you to confirm.
            </Typography>
            <Typography className={classes.sectionText} spacingAfter={4}>
              If you’ve placed your order before 3pm we aim to send you
              confirmation of your order on the same working day. If you order
              after 3pm or over the weekend, we will email you the next working
              day.
            </Typography>
            <Typography
              className={classes.sectionTitle}
              variant={"h4"}
              spacingAfter={1}
            >
              What if my order isn’t approved?
            </Typography>
            <Typography className={classes.sectionText} spacingAfter={4}>
              If our pharmacist doesn’t approve your order, we will send you an
              email to explain the reasoning, and automatically cancel your
              order.
            </Typography>
            <Divider classes={{ root: classes.divider }} />
            <Spacing spacing={4} />
            <Typography
              className={clsx(classes.sectionText, classes.step)}
              spacingAfter={1}
            >
              Step 2
            </Typography>
            <Typography
              className={classes.sectionTitle}
              variant={"h3"}
              spacingAfter={2}
            >
              Order dispatched
            </Typography>
            <Typography className={classes.sectionText} spacingAfter={4}>
              We'll let you know when your order has been dispatched.
            </Typography>
            <Divider classes={{ root: classes.divider }} />
            <Spacing spacing={4} />
            <Typography
              className={clsx(classes.sectionText, classes.step)}
              spacingAfter={1}
            >
              Step 3
            </Typography>
            <Typography
              className={classes.sectionTitle}
              variant={"h3"}
              spacingAfter={2}
            >
              Delivery
            </Typography>
            <Typography className={classes.sectionText} spacingAfter={0}>
              We’ll email you to let you know your order is out for delivery.
            </Typography>
            <br />
            <br />
            {isAuthenticated && (
              <>
                <Spacing spacing={4} />
                <Button
                  fullWidth
                  variant={"contained"}
                  color={"primary"}
                  endIcon={<ChevronRight />}
                  size={"large"}
                  // https://github.com/mui-org/material-ui/issues/22452 this is fixed in version 5 of material ui
                  // @ts-ignore
                  component={Link}
                  to={`/account/${
                    confirmationData?.subscription ? "subscription" : "order"
                  }/${confirmationData?.orderId}`}
                >
                  Go to{" "}
                  {confirmationData?.subscription ? "subscription" : "order"}
                </Button>
              </>
            )}
          </>
        )}
      </Container>
    </GeneralLayout>
  );
};

export default OnlineServicesCheckoutConfirmationPage;
