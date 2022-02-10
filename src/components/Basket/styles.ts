import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    border: `2px solid ${wellColors.greyscale[500]}`,
    borderRadius: "10px",
    [theme.breakpoints.up("sm")]: {
      border: "none",
      borderRadius: 0,
      borderLeft: `2px solid ${wellColors.greyscale[500]}`,
    },
  },
  cardContent: {
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 0, 2, 3),
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 6),
    },
  },
  titleWrapper: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hasAction: {
    cursor: "pointer",
  },
  titleIcon: {
    marginRight: "10px",
    color: wellColors.elixir[900],
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  promoIcon: {
    marginRight: "12px",
    color: wellColors.elixir[300],
  },
  image: {
    height: "60px",
    display: "block",
    marginRight: theme.spacing(2),
  },
  defaultText: {
    color: wellColors.elixir[600],
    fontWeight: 600,
  },
  detailsText: {
    color: wellColors.elixir[300],
    fontSize: "16px",
    fontWeight: 400,
  },
  // blueText: {
  //   color: wellColors.zen[400],
  //   fontWeight: 600,
  // },
  divider: {
    backgroundColor: wellColors.greyscale[300],
  },
  dividerDark: {
    backgroundColor: wellColors.elixir[400],
  },
  darkColor: {
    color: wellColors.elixir[900],
  },
  caption: {
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: "16px",
    color: wellColors.elixir[400],
    letterSpacing: "0.5px",
  },

  totalWrapper: {
    paddingTop: "12px",
    borderTop: `2px solid ${wellColors.elixir[900]}`,
  },

  totalPrice: {
    fontSize: "34px",
  },

  discountRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  discountValue: {
    display: "flex",
    alignItems: "center",
    color: wellColors.elixir[200],
  },

  discountHeading: {
    color: wellColors.elixir[900],
    fontSize: "18px",
    fontWeight: 400,
  },

  discountMessage: {
    display: "flex",
    fontSize: "12px",
    fontWeight: 400,
  },

  subtotalWrapper: {
    paddingTop: theme.spacing(1),
    margin: theme.spacing(2, 0),
    borderTop: "1px solid #E6E6E6",
  },

  discountSubtotal: {
    fontSize: "18px",
    fontWeight: 700,
    color: wellColors.elixir[600],
  },

  errorMessage: {
    color: wellColors.bloom[800],
    fontSize: "14px",
    fontWeight: 600,
  },

  successMessage: {
    color: wellColors.tonic[800],
    fontSize: "14px",
    fontWeight: 600,
  },

  messageWrapper: {
    padding: theme.spacing(0, 2),
  },

  discountRemoveIcon: {
    color: wellColors.bloom[900],
    cursor: "pointer",
  },

  iconPlaceholder: {
    width: "20px",
  },

  productSummary: {
    borderBottom: "1px solid #E6E6E6",
  },
}));
