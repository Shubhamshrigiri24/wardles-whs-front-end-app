import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: wellColors.elixir[900],
  },

  body: {
    color: wellColors.elixir[300],
  },

  paper: {
    height: "auto !important",
    maxHeight: "100%",
  },

  backButton: {
    minWidth: 60,
  },
}));
