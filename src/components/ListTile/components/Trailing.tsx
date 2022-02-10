import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  trailing: {
    marginLeft: theme.spacing(1),
  },
}));

export const Trailing: FC = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.trailing} {...rest}>
      {children}
    </div>
  );
};
