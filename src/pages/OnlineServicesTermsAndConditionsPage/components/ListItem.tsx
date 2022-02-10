import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  listRow: {
    display: "flex",
    paddingBottom: theme.spacing(1),
  },
}));

export type ListItemProps = {
  bullet?: string;
};

export const ListItem: React.FC<ListItemProps> = ({ bullet, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.listRow}>
      <div style={{ width: "4%" }}>{`(${bullet})`}</div>
      <div style={{ width: "96%" }}>{children}</div>
    </div>
  );
};

export default ListItem;
