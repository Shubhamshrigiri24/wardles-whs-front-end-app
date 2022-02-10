import React, { FC } from "react";
import { Container, Paper, makeStyles, Theme, Box } from "@material-ui/core";
import { wellColors, Typography } from "@welldigital/components";

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    backgroundColor: wellColors.greyscale[100],
  },
  bannerTitle: {
    textTransform: "capitalize",
    fontSize: "34px",
    lineHeight: "125%",
    color: wellColors.elixir[900],
    [theme.breakpoints.up("md")]: {
      fontSize: "48px",
    },
  },
  bannerText: {
    fontWeight: 500,
    color: wellColors.elixir[900],
  },
}));

const AccountOverviewBanner: FC<{ orderType: string }> = ({ orderType }) => {
  const classes = useStyles();
  return (
    <Paper classes={{ root: classes.banner }} elevation={0}>
      <Container maxWidth={"lg"}>
        <Box py={6}>
          <Typography
            classes={{ root: classes.bannerTitle }}
            variant={"h1"}
            spacingAfter={3}
            data-testid={"accountOverviewBanner/title"}
          >
            {orderType}
          </Typography>
          <Box maxWidth={520}>
            <Typography
              data-testid={"accountOverviewBanner/content"}
              variant={"h4"}
              className={classes.bannerText}
            >
              Check the dates and status of your {orderType}.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default AccountOverviewBanner;
