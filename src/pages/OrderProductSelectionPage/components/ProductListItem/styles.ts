import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  productListItem: {
    flex: "0 0 100%",
    flexDirection: "column",
    display: "flex",
    boxSizing: "border-box",
    borderTop: "1px solid #f4f4f4",
    paddingTop: 30,
    background: "#ffffff",
    color: "#222",

    [theme.breakpoints.up("sm")]: {
      flex: "0 1 calc(50% - 12px)", // same as margin-left below
      borderTop: "none",
      paddingTop: 0,
    },
    [theme.breakpoints.up("md")]: {
      flex: "0 1 calc(33.333% - 12px)",
    },
    [theme.breakpoints.up("lg")]: {
      flex: "0 1 calc(25% - 12px)",
    },
  },
  productHeader: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  productImage: {
    maxWidth: "33.333%",
    height: 100,
    objectFit: "cover",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "100%",
    },
  },

  productNameAndAccolade: {
    flex: "1 0 66.666%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 0px 0px 10px",
    [theme.breakpoints.up("sm")]: {
      flex: "1 0 100%",
      padding: "0px 0px 0px 0px",
    },
  },
  productName: {
    color: wellColors.elixir[900],
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "26px",
    letterSpacing: "0.022em",
    margin: "10px 0px 10px 0px",
  },
  productAccolade: {
    color: wellColors.elixir[400],
    display: "flex",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "15px",
    alignItems: "center",
    margin: "0px 0px 12px 0px",
  },
  bestValueIcon: {
    marginRight: 5,
    color: wellColors.zen[500],
  },
  productLinesWrapper: {
    [theme.breakpoints.up("sm")]: {
      borderRight: `1px solid ${wellColors.greyscale[200]}`,
      borderLeft: `1px solid ${wellColors.greyscale[200]}`,
    },
  },
  productLinesHead: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "14px 5px",

    [theme.breakpoints.up("sm")]: {
      padding: 14,
      borderTop: `1px solid ${wellColors.greyscale[200]}`,
      backgroundColor: "#f9f9f9",
    },

    "& .from": {
      color: wellColors.elixir[600],
      display: "flex",
      alignItems: "center",
      minWidth: 95,
      fontSize: 16,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "26px",
      letterSpacing: "0.028em",
      textAlign: "left",
      "& .starting-price": {
        marginLeft: 5,
        fontWeight: 600,
      },
    },

    "& .per-unit": {
      color: wellColors.elixir[900],
      display: "inline-block",
      position: "relative",
      padding: "10px 10px",
      marginLeft: 12,
      marginRight: 10,
      fontSize: 14,
      backgroundColor: wellColors.zest[500],
      borderRadius: 8,

      [theme.breakpoints.up("sm")]: {
        marginRight: 0,
      },
      "&::before": {
        position: "absolute",
        content: '""',
        width: 0,
        height: 0,
        borderTop: "5px solid transparent",
        borderRight: `10px solid ${wellColors.zest[500]}`,
        borderBottom: "5px solid transparent",
        left: -10,
        top: "50%",
        transform: "translate(0, -50%)",
      },
    },
  },
  productLines: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
    },
  },
  productLine: {
    flex: "0 0 33.33%",
    padding: "10px 10px",
    color: wellColors.elixir[600],
    fontSize: 16,
    letterSpacing: "0.028em",
    borderRight: "1px solid #dddddd",
    "&:nth-child(1)": {
      borderLeft: "1px solid #dddddd",
    },
    "& .label": {
      display: "block",
      marginRight: 8,
      fontWeight: "bold",
      [theme.breakpoints.up("sm")]: {
        display: "inline",
      },
    },
    "& .value": {
      fontWeight: 400,
    },
    // on mobile showing just 3 props
    "&:nth-child(n + 4)": {
      display: "none",
    },

    [theme.breakpoints.up("sm")]: {
      "&:nth-child(1)": {
        borderLeft: "none",
      },
      borderRight: "none",
      borderBottom: "1px solid #f4f4f4",
      "&:nth-child(n + 4)": {
        display: "block",
      },
    },
  },
  buttonsWrapper: {
    marginTop: 30,
    marginBottom: 70,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: 15,
    },
  },
  button: {
    borderRadius: 8,
    border: "none",
    padding: 15,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.02, 1.02)",
    },
  },
  buttonSelected: {
    outline: `2px solid ${wellColors.zen[500]}`,
  },
  buttonMobile: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    width: "50%",
  },
  buttonMoreInfo: {
    backgroundColor: wellColors.zen[50],
    color: wellColors.zen[500],
  },
  buttonSelect: {
    backgroundColor: wellColors.zen[500],
    color: "#FFFFFF",
    marginLeft: 10,
  },
  buttonSelectLargeScreen: {
    display: "none",
    textDecoration: "none",
    backgroundColor: wellColors.zen[50],
    color: wellColors.zen[500],
    width: "100%",
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "center",
  },
}));
