import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  pageContainer: {
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(12, 0),
    },
  },

  subTitle: {
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightBold,
    color: wellColors.elixir[900],
  },

  paragraph: {
    color: wellColors.elixir[400],
  },

  deliveryName: {
    color: wellColors.elixir[900],
  },

  warningAlert: {
    backgroundColor: wellColors.zest[50],
  },

  contentLoader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 0, 12),
  },

  link: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontWeight: 600,
  },

  backLink: {
    display: "flex",
    color: wellColors.elixir[900],
    fontWeight: 600,
  },

  actionsWrapper: {
    marginBottom: theme.spacing(6),
  },

  cancelLink: {
    color: wellColors.bloom[900],
  },

  healthStatusInput: {
    minHeight: "100px",
  },
}));
