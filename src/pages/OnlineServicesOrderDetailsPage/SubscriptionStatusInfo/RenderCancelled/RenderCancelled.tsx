import React, { FC } from "react";
import { Typography, Button, Alert } from "@welldigital/components";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: wellColors.elixir[900],
    fontWeight: theme.typography.fontWeightBold,
  },
  description: {
    color: wellColors.elixir[400],
    fontWeight: 600,
  },
  alertRoot: {
    color: `${wellColors.elixir[900]} !important`,
    "& svg": {
      color: `${wellColors.elixir[900]} !important`,
    },
  },
}));

export const RenderCancelled: FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <Alert
        className={classes.alertRoot}
        message={
          <>
            <Typography
              className={classes.title}
              variant={"h4"}
              spacingAfter={1}
            >
              Your subscription has been cancelled
            </Typography>
            <Typography className={classes.description}>
              We’ve sent you an email to confirm your cancellation. If you’d
              like to restart your subscription in the future you’ll need to
              complete your online consultation again.
            </Typography>
          </>
        }
        type={"success"}
        spacingAfter={4}
      />
      <Button
        color={"primary"}
        endIcon={<ChevronRight />}
        size={"large"}
        fullWidth
        // https://github.com/mui-org/material-ui/issues/22452 this is fixed in version 5 of material ui
        // @ts-ignore
        target={"_blank"}
        href={"https://www.well.co.uk/pharmacy-services"}
      >
        Explore our services
      </Button>
    </>
  );
};

export default RenderCancelled;
