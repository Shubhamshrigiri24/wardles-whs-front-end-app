import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  productListContainer: {
    width: "100%",
  },
  productListSortContainer: {
    padding: "20px 16px",
    background: wellColors.zen[50],

    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  productListSortContainerTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0.028em",
    color: wellColors.elixir[900],
  },
  selectOption: {
    color: wellColors.elixir[400],
  },
  formControl: {
    margin: 0,
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 16px",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  },
}));
