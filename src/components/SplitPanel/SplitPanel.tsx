import React, { FC } from "react";
import {
  Grid,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  secondaryPanelBreaksUpwards: {
    order: 1,
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  mainPanelBreaksDownwards: {
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
}));

export interface SplitPanelProps {
  main: JSX.Element;
  secondary: JSX.Element;
}

const SplitPanel: FC<SplitPanelProps> = ({ main, secondary }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={isMobile ? 0 : 3}
      direction="row"
      className={classes.container}
    >
      <Grid item xs={12} md={8} className={classes.mainPanelBreaksDownwards}>
        {main}
      </Grid>
      <Grid item xs={12} md={4} className={classes.secondaryPanelBreaksUpwards}>
        {secondary}
      </Grid>
    </Grid>
  );
};

export default SplitPanel;
