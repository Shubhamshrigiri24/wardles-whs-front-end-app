import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  pageContainer: { padding: "50px 0" },
  pageTitle: {
    color: wellColors.elixir[900],
    fontSize: 48,
    lineHeight: 1,
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    padding: "0 16px",
  },
  pageHeadText: {
    color: wellColors.elixir[400],
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 50,
    padding: "0 16px",
  },
  contentLoader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  largeScreenSelectedProductWrapper: {
    padding: "0 16px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  largeScreenSelectedProductWrapperInner: {
    display: "flex",
    flexDirection: "row",

    border: "2px solid #0059F0",
    boxSizing: "border-box",
    borderRadius: 6,
  },
  largeScreenSelectedProductInfoContainer: {
    width: "50%",
    backgroundColor: "#E0ECFD",
    padding: theme.spacing(5),
  },
  largeScreenSelectedProductInfoTitle: {
    color: wellColors.elixir[900],
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: "0.25px",
    margin: "24px 0",
  },
  largeScreenSelectedProductDetailsContainer: {
    width: "50%",
    padding: "0 0 30px 0",
  },
  largeScreenSelectedProductDetailsSubmitButton: {
    padding: "0 16px",
  },
}));
