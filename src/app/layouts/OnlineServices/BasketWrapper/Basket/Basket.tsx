import React, { FC, useCallback } from "react";
import { Typography, makeStyles, Theme, Grid } from "@material-ui/core";
import {
  Product,
  Pack,
  OnlineService,
} from "../../../../store/reducer/online/types";
import USPBanner from "components/USPBanner";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
    maxWidth: "372px",
    margin: "auto",
  },
  paddingLeft: {
    paddingLeft: theme.spacing(3),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(4),
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  blueArea: {
    backgroundColor: "#E0ECFD",
    padding: theme.spacing(3),
    borderRadius: "8px",
    color: "#0061F2",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export interface BasketProps {
  product?: Product;
  basketItems?: Pack[];
  onlineService: OnlineService;
}

const Basket: FC<BasketProps> = ({ product, basketItems, onlineService }) => {
  const classes = useStyles();

  const calculateTotal = useCallback(() => {
    return basketItems?.reduce((acc, curr) => {
      if (curr?.price) acc += curr.price;
      return acc;
    }, 0);
  }, [basketItems]);

  return (
    <div className={classes.container}>
      <Grid container className={classes.paddingBottom}>
        <Typography>
          <b>Your basket</b>
        </Typography>
        {basketItems?.map((item) => {
          return (
            <Grid
              key={`basketItem-${item?.label}`}
              item
              xs={12}
              className={classes.padding}
            >
              <Typography variant={"subtitle1"}>
                {`${product?.name ?? ""} ${product?.variant ?? ""}`}
              </Typography>

              <Typography variant={"subtitle1"}>{item?.label || ""}</Typography>
            </Grid>
          );
        })}
        <Grid item xs={6}>
          <Typography variant={"subtitle1"}>Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant={"subtitle1"} align={"right"}>
            £{calculateTotal()?.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      {product !== undefined ? <USPBanner product={product} /> : null}
    </div>
  );
};

export default Basket;
