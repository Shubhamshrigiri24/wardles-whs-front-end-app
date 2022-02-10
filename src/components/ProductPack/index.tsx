import React, { useCallback } from "react";
import {
  Card,
  FormControlLabel,
  makeStyles,
  Radio,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import classNames from "clsx";
import BestValueTag from "../BestValueTag";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "4px",
    cursor: "pointer",
    "&:not(:last-child)": {
      marginBottom: "18px",
    },
    "&:hover": {
      backgroundColor: "#F4F4F4",
    },
  },
  inner: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    border: "1px solid transparent",
    borderRadius: "3px",
    "$selected &": {
      borderColor: "#0059F0",
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 2, 1.5),
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  selected: {
    borderColor: "#0059F0",
  },
  packLabelGreyContainer: {
    display: "flex",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  packLabel: {
    marginRight: theme.spacing(1),
    fontWeight: 600,
  },
  packLabelGrey: {
    color: "#919BA2",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginRight: "0px",
    },
  },
  checkbox: {
    color: "#000 !important",
  },
  checkboxChecked: {
    color: "#0059F0 !important",
  },
  bestValueTag: {
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

export type ProductPackProps = IProductPack & {
  checked?: boolean;
  onCheck?: () => void;
};

export interface IProductPack {
  label: string;
  price: number;
  pricePerUnit: number;
  isBestValue?: boolean;
}

export const ProductPack: React.FC<ProductPackProps> = ({
  label,
  price,
  pricePerUnit,
  checked,
  onCheck,
  isBestValue,
}) => {
  const classes = useStyles();
  const handleCheck = useCallback(() => {
    if (typeof onCheck === "function") {
      onCheck();
    }
  }, [onCheck]);
  return (
    <Card
      className={classNames(classes.root, { [classes.selected]: checked })}
      onClick={handleCheck}
    >
      <div className={classes.inner}>
        <FormControlLabel
          control={
            <Radio
              className={classes.packLabel}
              checked={checked}
              classes={{
                root: classes.checkbox,
                checked: classes.checkboxChecked,
              }}
            />
          }
          label={label}
        />
        <div className={classes.packLabelGreyContainer}>
          <Typography className={classes.packLabelGrey}>
            £{price.toFixed(2)}
            {pricePerUnit > 0 ? `(£${pricePerUnit.toFixed(2)} per unit)` : null}
          </Typography>
        </div>
        {isBestValue && <BestValueTag className={classes.bestValueTag} />}
      </div>
    </Card>
  );
};
