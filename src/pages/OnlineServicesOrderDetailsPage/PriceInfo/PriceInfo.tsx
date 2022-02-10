import React, { FC } from "react";
import { Grid, Divider } from "@material-ui/core";
import { Typography, Spacing } from "@welldigital/components";
import { useStyles } from "./styles";

export type PriceInfoProps = {
  label: string;
  price: string;
  highlightLabel?: boolean;
  highlightPrice?: boolean;
};
export const PriceInfo: FC<PriceInfoProps> = ({
  label,
  price,
  highlightLabel = false,
  highlightPrice = false,
}) => {
  const classes = useStyles();
  return (
    <>
      <Spacing spacing={3} />
      <Divider className={classes.divider} />
      <Spacing spacing={1} />
      <Grid container wrap={"nowrap"}>
        <Grid item xs>
          <Typography
            className={highlightLabel ? classes.highlightedText : classes.text}
            data-testid={"priceInfo/label"}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={"auto"}>
          <Typography
            className={highlightPrice ? classes.highlightedText : classes.text}
            data-testid={"priceInfo/price"}
          >
            {price}
          </Typography>
        </Grid>
      </Grid>
      <Spacing spacing={3} />
    </>
  );
};

export default PriceInfo;
