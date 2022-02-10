import React, { FC } from "react";
import { Grid, Box } from "@material-ui/core";
import { Typography } from "@welldigital/components";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { useStyles } from "./styles";

export type DiscountInfoProps = {
  title: string;
  label: string;
  price: string;
};

export const DiscountInfo: FC<DiscountInfoProps> = ({
  title,
  label,
  price,
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title} data-testid={"discountInfo/title"}>
        {title}
      </Typography>
      <Grid container justify={"space-between"} wrap={"nowrap"}>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <LocalOfferIcon className={classes.promoIcon} fontSize={"small"} />
            <Typography
              className={classes.text}
              data-testid={"discountInfo/label"}
            >
              {label}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={"auto"}>
          <Typography
            className={classes.text}
            align={"right"}
            noWrap
            data-testid={"discountInfo/price"}
          >
            {price}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscountInfo;
