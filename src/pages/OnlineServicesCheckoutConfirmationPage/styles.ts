import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  pageContent: {
    padding: theme.spacing(6, 2, 6),
    minHeight: "50vh",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(12, 0, 12),
    },
  },

  pageTitle: {
    fontSize: "34px",
    lineHeight: "125%",
    color: wellColors.elixir[900],
  },

  sectionTitle: {
    color: wellColors.elixir[900],
  },

  sectionText: {
    fontSize: "18px",
    lineHeight: "180%",
    color: wellColors.elixir[300],
  },

  divider: {
    backgroundColor: wellColors.greyscale[500],
  },
  error: {
    color: theme.palette.error.main,
  },
  step: {
    fontWeight: 600,
  },
}));
