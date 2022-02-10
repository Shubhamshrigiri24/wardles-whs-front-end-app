import React, { FC } from "react";
import clsx from "clsx";
import { makeStyles, Theme, CardMedia, Grid } from "@material-ui/core";
import { wellColors, Typography } from "@welldigital/components";

const useStyles = makeStyles((theme: Theme) => ({
  media: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },

  mediaImage: {
    height: 90,
    width: "auto",
    marginRight: theme.spacing(9),
  },

  mediaName: {
    fontSize: "34px",
    lineHeight: "125%",
    color: wellColors.elixir[900],
  },

  info: {
    display: "flex",
    flexWrap: "wrap",
  },

  infoItem: {
    minWidth: 170,
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },

  infoItemLabel: {
    color: wellColors.elixir[900],
  },

  infoItemValue: {
    color: wellColors.elixir[300],
  },

  infoItemValueHighlight: {
    color: wellColors.bloom[800],
  },
}));

export type SummaryCardInfoType = {
  label: string;
  value: string;
  valueHighlight?: boolean;
};
interface OrderSummaryCardProps {
  image: string;
  name: string;
  type: string;
  info: Array<Array<SummaryCardInfoType>>;
}

const OrderSummaryCard: FC<OrderSummaryCardProps> = ({
  image,
  name,
  type,
  info,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.media}>
        <CardMedia
          classes={{ media: classes.mediaImage }}
          src={image}
          component={"img"}
        />
        <div>
          <Typography
            className={classes.mediaName}
            variant={"h2"}
            spacingAfter={0}
          >
            {name}
          </Typography>
          <Typography variant={"h4"} color={"primary"} spacingAfter={0}>
            {type}
          </Typography>
        </div>
      </div>
      <div className={classes.info}>
        {info.map((row, rowIndex) => (
          <Grid container key={rowIndex}>
            {row.map((item, itemIndex) => (
              <Grid item className={classes.infoItem} key={itemIndex}>
                <Typography
                  className={classes.infoItemLabel}
                  variant={"subtitle1"}
                  spacingAfter={0}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant={"subtitle1"}
                  className={clsx(classes.infoItemValue, {
                    [classes.infoItemValueHighlight]: !!item.valueHighlight,
                  })}
                >
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default OrderSummaryCard;
