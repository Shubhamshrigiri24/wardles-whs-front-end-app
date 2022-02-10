import React, { FC, useCallback } from "react";
import {
  makeStyles,
  Container,
  Toolbar,
  AppBar,
  Link,
} from "@material-ui/core";
import WellLogo from "app/layouts/OnlineServices/GeneralLayout/components/WellLogo";
import {
  UserProfile,
  useAuthentication,
  AUTHENTICATED_STATE,
} from "@welldigital/ui-common/Authentication";
import { eventsBuilder } from "utils/events";
import { analytics } from "@welldigital/ui-common";
import { getUserProfileProps } from "../../../../../config/userProfile.config";

const useStyles = makeStyles({
  header: {
    height: 84,
    backgroundColor: "transparent",
  },
  headerContainer: {
    height: "100%",
  },
  logoLink: {
    textDecoration: "none",
  },
  logo: {
    width: "95px",
    height: "32px",
  },
  toolbar: {
    height: "100%",
    justifyContent: "space-between",
  },
});
const Header: FC<{}> = () => {
  const { authenticatedState } = useAuthentication();
  const classes = useStyles();

  const trackLogin = useCallback(() => {
    if (authenticatedState === AUTHENTICATED_STATE.NO) {
      analytics.trackEvent({
        flow: "ed",
        event: eventsBuilder.loginOptions.customerLogin,
        metadata: {
          source: "navbar link",
          url: document.location.href,
        },
      });
    }
  }, [authenticatedState]);

  return (
    <AppBar
      classes={{ root: classes.header }}
      elevation={0}
      position={"static"}
      color={"inherit"}
    >
      <Container maxWidth={"lg"} className={classes.headerContainer}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Link href={"https://www.well.co.uk/"} className={classes.logoLink}>
            <WellLogo className={classes.logo} />
          </Link>
          <div onClick={trackLogin}>
            <UserProfile {...getUserProfileProps()} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
