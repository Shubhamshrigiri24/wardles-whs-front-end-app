import React, { FC } from "react";
import Basket from "components/Basket";
import { Container, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pageContent: {
      display: "flex",
      minHeight: "700px",
      flexWrap: "wrap",
      [theme.breakpoints.up("sm")]: {
        flexWrap: "nowrap",
      },
    },
    pageContentLeft: {
      width: "100%",
      overflow: "hidden",
      padding: "32px 0",
      order: 1,
      [theme.breakpoints.up("sm")]: {
        width: "calc(100% - 300px)",
        order: 0,
        padding: "64px 24px",
      },
      [theme.breakpoints.up("md")]: {
        width: "calc(100% - 496px)",
      },
    },
    pageContentRight: {
      padding: "32px 0 0 0",
      width: "100%",
      order: 0,
      [theme.breakpoints.up("sm")]: {
        width: "300px",
        flexShrink: 0,
        order: 1,
        padding: "64px 0",
      },
      [theme.breakpoints.up("md")]: {
        width: "496px",
      },
    },
  });
});

const OrderBasketWrapper: FC<{ shouldSuppressDeliveryInfo?: boolean }> = ({
  children,
  shouldSuppressDeliveryInfo = false,
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth={"lg"}>
      <div className={classes.pageContent}>
        <div className={classes.pageContentLeft}>{children}</div>
        <div className={classes.pageContentRight}>
          <Basket shouldSuppressDeliveryInfo={shouldSuppressDeliveryInfo} />
        </div>
      </div>
    </Container>
  );
};

export default OrderBasketWrapper;
