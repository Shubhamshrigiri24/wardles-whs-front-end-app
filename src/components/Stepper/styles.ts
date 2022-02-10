import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

const LINE_LENGTH = 80;

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(12),
    },
  },

  step: {
    position: "relative",
    color: "#0C161F",
    display: "flex",
    alignItems: "center",

    "&:not(:last-child)": {
      marginRight: `${LINE_LENGTH}px`,

      "&::after": {
        content: "''",
        position: "absolute",
        right: `-${LINE_LENGTH}px`,
        width: `${LINE_LENGTH}px`,
        top: "50%",
        transform: "translateY(-50%)",
        borderBottom: "1px solid #9C9C9C",
      },
    },
  },

  stepName: {
    color: wellColors.elixir[400],
    fontWeight: theme.typography.fontWeightRegular,
  },

  stepNumber: {
    marginRight: theme.spacing(1.5),
  },

  stepNumberInner: {
    display: "grid",
    placeItems: "center",
    width: "25px",
    height: "25px",
    fontSize: "14px",
    color: theme.palette.common.white,
    backgroundColor: wellColors.elixir[300],
    borderRadius: "50%",
  },

  stepActive: {
    "&$stepNumberInner": {
      backgroundColor: theme.palette.primary.main,
    },
    "&$stepName": {
      color: theme.palette.primary.main,
    },
  },
}));
