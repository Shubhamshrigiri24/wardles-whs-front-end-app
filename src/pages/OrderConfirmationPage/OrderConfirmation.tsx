import React, { useEffect } from "react";
import {
  Container,
  Card,
  makeStyles,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core";
import USPBanner from "../../components/USPBanner";
import CheckoutHeader from "../../components/CheckoutHeader/CheckoutHeader";
import {
  Product,
  OnlineService,
  Ed,
  Pack,
  OnlineQuestion,
} from "app/store/reducer/online/types";
import { analytics } from "@welldigital/ui-common/Analytics";
import OnlineFooter from "../../components/OnlineFooter/OnlineFooter";
import ImportantInfo from "./ImportantInfo/ImportantInfo";

const useStyles = makeStyles((theme: Theme) => ({
  pageMargin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(15),
  },
  largeMarginTop: {
    marginTop: theme.spacing(5),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  smallMarginTop: {
    marginTop: theme.spacing(1),
  },
  card: {
    border: "none",
    background: "none",
    width: "577px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  captionText: {
    color: "#65727D",
    marginTop: theme.spacing(2),
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  captionTextLargeMargin: {
    color: "#65727D",
    marginTop: theme.spacing(6),
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  horizontalText: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
  },
  textBox: {
    width: "157px",
    marginRight: theme.spacing(4),
  },
  divider: { width: "100%", marginTop: theme.spacing(7) },
}));

export interface OrderConfirmationStateProps {
  selectedOnlineService: OnlineService;
  selectedProduct: Product;
  selectedPack: Pack;
  orderNumber: string;
  onlineConsultation: OnlineQuestion[];
}

export interface OrderConfirmationDispatchProps {}

export type OrderConfirmationProps = OrderConfirmationStateProps &
  OrderConfirmationDispatchProps;

const OrderConfirmationPage: React.FC<OrderConfirmationProps> = ({
  selectedProduct,
  selectedPack,
  selectedOnlineService,
  orderNumber,
  onlineConsultation,
}) => {
  const classes = useStyles();
  useEffect(() => {
    analytics.trackEvent({
      flow: selectedOnlineService.id,
      event: "Order complete",
      metadata: {
        product: selectedProduct,
        packSize: selectedPack.name,
      },
    });
  }, [selectedOnlineService.id, selectedPack.name, selectedProduct]);
  return (
    <>
      <CheckoutHeader />
      <Container maxWidth={"sm"} className={classes.pageMargin}>
        <Card className={classes.card}>
          <Typography variant={"h2"} className={classes.largeMarginTop}>
            Thank you, we have received your order
          </Typography>
          <Typography variant={"h5"} className={classes.largeMarginTop}>
            Your order number {orderNumber}
          </Typography>
          <div className={classes.horizontalText}>
            <div className={classes.textBox}>
              <Typography variant={"h5"}>
                {`${selectedProduct.name} ${selectedProduct.variant ?? ""}`}
              </Typography>
            </div>
            <div className={classes.textBox}>
              <Typography variant={"h5"}>Estimated delivery</Typography>
              <Typography variant={"h5"}>2 to 4 days</Typography>
            </div>
          </div>
          <div className={classes.smallMarginTop}>
            <USPBanner product={selectedProduct} />
          </div>
          <Divider className={classes.divider} />
          <ImportantInfo consultation={onlineConsultation} />
          <Typography variant={"h2"} className={classes.largeMarginTop}>
            What happens next?
          </Typography>
          <Typography className={classes.captionTextLargeMargin}>
            Step 1
          </Typography>
          <Typography variant={"h3"} className={classes.smallMarginTop}>
            Pharmacist approval
          </Typography>
          <Typography className={classes.captionText}>
            One of our pharmacists will confirm you’re eligible for{" "}
            {selectedProduct.service === Ed.id ? "ED" : selectedProduct.name}{" "}
            treatment. This is to make sure your treatment is safe and suitable
            for you.
          </Typography>
          <Typography variant={"h5"} className={classes.marginTop}>
            What if my order isn't approved?
          </Typography>
          <Typography className={classes.captionText}>
            If our pharmacist can’t approve your order, they’ll explain the
            reason for this in an email.
          </Typography>
          <Typography className={classes.captionTextLargeMargin}>
            Step 2
          </Typography>
          <Typography variant={"h3"} className={classes.smallMarginTop}>
            Order dispatched
          </Typography>
          <Typography className={classes.captionText}>
            We’ll dispatch your order as soon as a pharmacist approves it.
            Dispatch will be on the same working day if you made your order
            before 3pm.
            <br />
            <br />
            If you ordered after 3pm, we’ll dispatch your order the next working
            day. If you ordered over the weekend, your order will be processed
            on the next working day.
          </Typography>
          <Typography className={classes.captionTextLargeMargin}>
            Step 3
          </Typography>
          <Typography variant={"h3"} className={classes.smallMarginTop}>
            Delivery
          </Typography>
          <Typography className={classes.captionText}>
            We’ll email you to let you know your order is out for delivery. It
            should be with you in 2-4 days.
          </Typography>
        </Card>
      </Container>
      <OnlineFooter />
    </>
  );
};

export default OrderConfirmationPage;
