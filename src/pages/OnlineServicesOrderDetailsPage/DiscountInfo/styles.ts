import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    title: {
      color: wellColors.elixir[900],
      fontWeight: theme.typography.fontWeightRegular,
      marginBottom: "5px",
    },
    text: {
      color: wellColors.elixir[400],
      fontWeight: theme.typography.fontWeightRegular,
    },
    promoIcon: {
      marginRight: "12px",
      color: wellColors.elixir[200],
    },
  };
});
