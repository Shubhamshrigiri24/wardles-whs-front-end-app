import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: "flex",
    backgroundColor: "#F9F9F9",
    borderBottom: "1px solid #BDC3C7",
  },

  titleContainer: {
    display: "flex",
    padding: theme.spacing(2, 0),
  },

  title: {
    fontSize: "26px",
    fontWeight: 700,
  },

  productImage: {
    display: "inline-block",
    maxHeight: "50px",
    marginRight: theme.spacing(2),
  },

  externalLink: {
    display: "inline-flex",
  },

  externalLinkText: {
    color: wellColors.elixir[900],
    textDecoration: "underline",
    fontSize: "14px",
    fontWeight: 400,
  },

  externalLinkIcon: {
    marginLeft: theme.spacing(1),
  },

  footer: {
    borderTop: "1px solid #BDC3C7",
  },

  detailsBackground: {
    backgroundColor: wellColors.zen[50],
  },
  description: {
    color: wellColors.elixir[900],
  },
  moreInfoTitle: {
    color: wellColors.elixir[900],
    fontWeight: 700,
  },
  moreInfoText: {
    color: wellColors.elixir[900],
  },
}));
