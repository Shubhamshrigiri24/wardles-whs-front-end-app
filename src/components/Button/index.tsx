import React from "react";
import classNames from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  makeStyles,
  Theme,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core";

export type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: "formNext";
};

const useStyles = makeStyles((theme: Theme) => ({
  formNext: {
    backgroundColor: "black",
    color: "#fff",
    height: "68px",
    borderRadius: "10px",
    width: "100%",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#0059F0",
    },
    "&[aria-disabled=true], &[disabled]": {
      color: "#fff",
      backgroundColor: "#D7D7D7",
    },
  },
}));

export const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  const classes = useStyles();
  return (
    <MuiButton
      {...props}
      className={classNames(
        { [classes.formNext]: variant === "formNext" },
        props.className
      )}
      endIcon={variant === "formNext" ? <ChevronRightIcon /> : props.endIcon}
    />
  );
};
