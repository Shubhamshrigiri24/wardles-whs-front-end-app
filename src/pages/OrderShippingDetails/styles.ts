import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "34px",
    color: wellColors.elixir[900],
  },

  subTitle: {
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightBold,
    color: wellColors.elixir[500],
  },

  paragraph: {
    color: wellColors.elixir[300],
  },

  disclaimer: {
    color: wellColors.elixir[300],
  },

  textBold: {
    fontWeight: theme.typography.fontWeightBold,
  },

  link: {
    color: theme.palette.primary.main,
  },

  flexContainer: {
    display: "flex",
  },

  flexItemLeft: {
    flex: 1,
    marginRight: theme.spacing(3),
  },

  pageContainer: {
    display: "flex",
  },

  pageContent: {
    maxWidth: "575px",
    width: "100%",
    margin: "0 auto",
  },

  searchButton: {
    minWidth: "122px",
    color: wellColors.elixir[900],
    borderColor: wellColors.elixir[900],
  },

  alert: {
    margin: theme.spacing(3, 0),
  },

  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "grid",
    placeContent: "center",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  stepper: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
  },

  radio: {
    marginBottom: theme.spacing(1),
    "& > label": {
      padding: "4px 24px 4px 4px !important",
      minHeight: "0 !important",
      "& > span:last-child > div:first-child": {
        flexDirection: "row",
        "& > div:first-child": {
          minWidth: "170px",
        },
      },
    },
  },

  deliveryMoreInfoContainer: {
    marginBottom: theme.spacing(3),
    color: wellColors.elixir[300],
  },
  deliveryMoreInfoButton: {
    color: wellColors.elixir[300],
    fontSize: "16px",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
