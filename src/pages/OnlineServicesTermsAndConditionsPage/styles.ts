import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(4, 0, 3),
    backgroundColor: theme.palette.common.white,
  },

  pageHeading: {
    fontWeight: theme.typography.fontWeightMedium,
    color: wellColors.elixir[900],
    fontSize: "34px",
  },

  pageContent: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(19, 0, 8),
  },

  section: {
    marginBottom: theme.spacing(8),
    color: wellColors.elixir[900],
  },

  sectionTitle: {
    fontSize: "24px",
  },

  row: {
    display: "flex",
    marginBottom: theme.spacing(4),
  },

  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },

  boldUppercase: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },

  link: {
    color: theme.palette.primary.main,
  },

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(4),
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  linkIcon: {
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "50%",
    fontSize: "20px",
    marginLeft: theme.spacing(1),
  },
}));
