import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles<Theme, { uniform: boolean }>(
  (theme: Theme) =>
    createStyles({
      icon: {
        color: ({ uniform }) =>
          uniform ? wellColors.elixir[600] : wellColors.elixir[900],
        marginRight: theme.spacing(1),
      },
      label: {
        color: ({ uniform }) =>
          uniform ? wellColors.elixir[600] : wellColors.elixir[900],
        fontWeight: ({ uniform }) => (uniform ? 600 : 500),
      },
      value: {
        color: wellColors.elixir[600],
        fontWeight: ({ uniform }) => (uniform ? 600 : 400),
      },
    })
);
