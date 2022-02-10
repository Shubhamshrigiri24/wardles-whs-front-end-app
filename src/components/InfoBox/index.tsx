import React, { HTMLAttributes } from "react";
import classNames from "clsx";
import { makeStyles } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

const useStyles = makeStyles(() => ({
  root: {
    background: wellColors.zen[50],
    borderRadius: "8px",
    padding: "25px",
    "&:not(:last-child)": {
      marginBottom: "28px",
    },
  },
}));

export const InfoBox: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div {...props} className={classNames(classes.root, props.className)}>
      {children}
    </div>
  );
};
