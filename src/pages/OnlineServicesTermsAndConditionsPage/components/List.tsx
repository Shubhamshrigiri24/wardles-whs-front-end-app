import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    padding: theme.spacing(2, 4, 0),
  },
}));

export type ListProps = {
  marginBottom?: string;
};

export const List: React.FC<ListProps> = ({ marginBottom, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.list} style={{ marginBottom }}>
      {children}
    </div>
  );
};

export default List;
