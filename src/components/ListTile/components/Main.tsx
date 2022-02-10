import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((_theme: Theme) => ({
  main: {
    flex: 1,
  },
}));

export const Main: FC = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.main} {...rest}>
      {children}
    </div>
  );
};
