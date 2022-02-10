import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  title: {
    color: wellColors.elixir[900],
    fontSize: 24,
  },
  subTitle: {
    color: wellColors.elixir[500],
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.15px",
  },
  description: {
    color: wellColors.elixir[300],
    fontWeight: 400,
  },
  link: {
    display: "inline-block",
    color: wellColors.zen[500],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  blueButtonText: {
    color: wellColors.zen[500],
  },
  emailInput: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
}));
