import React, { HTMLAttributes } from "react";
import { makeStyles } from "@material-ui/core";
import classNames from "clsx";

export type TextProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "title" | "beforeTitle" | "paragraph" | "disclaimer" | "label";
  classes?: { root: string };
};

const useStyles = makeStyles(() => ({
  root: {
    color: "#0C161F",
    "&:not(:last-child)": {
      marginBottom: "28px",
    },
  },
  title: {
    lineHeight: "125%",
    fontWeight: 600,
    fontSize: "34px",
  },
  beforeTitle: {
    fontSize: "14px",
  },
  paragraph: {
    color: "#65727D",
    fontSize: "18px",
    lineHeight: "30px",
    "& a": {
      color: "#0061F2",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: "12px",
    lineHeight: "16px",
    color: "#919BA2",
    "&:not(:last-child)": {
      marginBottom: "16px",
    },
  },
}));

export const Text: React.FC<TextProps> = ({
  variant,
  children,
  classes: overwriteClasses,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div
      {...props}
      className={classNames(
        classes.root,
        overwriteClasses?.root,
        {
          [classes.beforeTitle]: variant === "beforeTitle",
          [classes.title]: variant === "title",
          [classes.paragraph]: variant === "paragraph",
          [classes.label]: variant === "label",
          [classes.disclaimer]: variant === "disclaimer",
        },
        props.className
      )}
    >
      {children}
    </div>
  );
};
