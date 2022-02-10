import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const generateBraintreeStyles = (theme: Theme) => ({
  "& .braintree-sheet__header": {
    display: "none",
  },

  "& .braintree-sheet": {
    border: "none",
  },

  "& .braintree-heading": {
    color: wellColors.elixir[600],
  },

  "& .braintree-method__label": {
    color: wellColors.elixir[900],
  },

  "& .braintree-method__icon.braintree-method__delete": {
    backgroundColor: wellColors.bloom[800],
  },

  "& .braintree-toggle": {
    color: wellColors.elixir[600],
  },

  "& .braintree-form__field-error": {
    color: `${wellColors.bloom[800]} !important`,
  },

  "& .braintree-methods--active:not(.braintree-methods--edit) .braintree-method--active .braintree-method__check":
    {
      backgroundColor: wellColors.tonic[800],
    },

  "& .braintree-methods--active:not(.braintree-methods--edit) .braintree-method--active":
    {
      borderColor: wellColors.tonic[800],
    },

  "& .braintree-form__label": {
    color: `${wellColors.elixir[500]} !important`,
    fotnSize: "18px !important",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },

  "& [data-braintree-id='delete-confirmation__message']": {
    color: wellColors.elixir[600],
  },

  "& [data-braintree-id='delete-confirmation__no']": {
    color: wellColors.elixir[600],
  },

  "& [data-braintree-id='delete-confirmation__yes']": {
    backgroundColor: `${wellColors.bloom[800]} !important`,
  },

  "& .braintree-sheet__content": {
    "&.braintree-sheet__content--form": {
      padding: 0,

      "& .braintree-form__flexible-fields": {
        display: "block",
        margin: theme.spacing(2, 0, 1),

        [theme.breakpoints.up("md")]: {
          display: "flex",
        },

        "& div[data-braintree-id='expiration-date-field-group']": {
          [theme.breakpoints.up("md")]: {
            marginRight: theme.spacing(2),
          },
        },
      },

      "& .braintree-form__field-group": {
        paddingLeft: 0,

        "&.braintree-form__field-group--has-error": {
          "& .braintree-form__field": {
            "& .braintree-form__hosted-field": {
              borderColor: `${wellColors.bloom[800]} !important`,
            },
          },
        },

        "& .braintree-form__field": {
          "& .braintree-form__hosted-field": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            height: `${theme.spacing(7)}px`,
            cursor: "text",

            "&:hover": {
              borderColor: "#212121",
            },

            "&.braintree-hosted-fields-focused": {
              transition: "border-color 0s",
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",

              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .number": {
              color: "red",
            },
          },
        },
      },
    },
  },
});

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    ...generateBraintreeStyles(theme),
  },

  payButton: {
    minWidth: "auto",
    [theme.breakpoints.up("sm")]: {
      minWidth: "150px",
    },
  },

  pageContent: {
    width: "100%",
    maxWidth: "575px",
    margin: "0 auto",
  },

  title: {
    fontSize: "34px",
    color: wellColors.elixir[900],
  },

  subTitle: {
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightMedium,
    color: wellColors.elixir[300],
  },

  flexContainer: {
    display: "flex",
    marginTop: theme.spacing(2),
  },

  loadingSpinnerCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  circularProgress: {
    marginRight: theme.spacing(1),
  },

  errorMessage: {
    marginTop: theme.spacing(4),
  },
  stepper: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
}));
