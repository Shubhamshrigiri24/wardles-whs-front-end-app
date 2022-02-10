import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    divider: {
      backgroundColor: wellColors.elixir[900],
    },
    text: {
      color: wellColors.elixir[400],
      fontWeight: theme.typography.fontWeightRegular,
    },
    highlightedText: {
      fontSize: "18px",
      color: wellColors.elixir[900],
      fontWeight: theme.typography.fontWeightBold,
      letterSpacing: "0.15px",
    },
  };
});
