import React, { FC } from "react";
import { Typography, Button, Alert } from "@welldigital/components";
import { ChevronRight, Error } from "@material-ui/icons";
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
    background: `#F9E2E6`,
    "& svg": {
      color: `${wellColors.elixir[900]} !important`,
    },
  },
}));

export const RenderDeclined: FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <Alert
        icon={Error}
        className={classes.alertRoot}
        message={
          <>
            <Typography
              className={classes.title}
              variant={"h4"}
              spacingAfter={1}
            >
              Our pharmacist has declined your order
            </Typography>
            <Typography className={classes.description}>
              Thanks for confirming the recent changes to your health. After
              reviewing the information that you submitted, our pharmacist has
              deemed it no longer safe for you to continue taking your
              medication. Therefore, you’ll no longer receive your monthly
              subscription and no further payments will be taken from your
              account.
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

export default RenderDeclined;
