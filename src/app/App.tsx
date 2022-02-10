import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useIntercom } from "react-use-intercom";
import TagManager from "react-gtm-module";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, wellColors } from "@welldigital/components";
import { ThemingProps } from "@welldigital/components/theming";
import { Optimize } from "@welldigital/ui-common/Optimize";
import {
  useAuthentication,
  AUTHENTICATED_STATE,
} from "@welldigital/ui-common/Authentication";
import { persistor } from "./store";
import ScrollToTop from "components/ScrollToTop";
import OnlineRoutes from "./routes/";
import "./styles.css";
import { analytics } from "@welldigital/ui-common";
import AccountsAPI from "utils/api/AccountsAPI";
import { TAccount } from "app/store/reducer/account/types";

if (process.env.REACT_APP_OPTIMIZE_ID && process.env.REACT_APP_GTAG_ID) {
  Optimize.registerOptimize(
    process.env.REACT_APP_OPTIMIZE_ID,
    process.env.REACT_APP_GTAG_ID
  );
}

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize({
    gtmId: process.env.REACT_APP_GTM_ID,
  });
}

const onlineCustomTheming: ThemingProps = {
  // TODO: remove when the design system is finished
  props: {
    MuiLink: {
      color: "secondary",
    },
  },
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: "1rem",
      },
    },
    MuiInputLabel: {
      root: {
        color: wellColors.elixir[300],
      },
    },
    MuiInputBase: {
      input: {
        color: wellColors.elixir[300],

        "&::placeholder": {
          color: wellColors.elixir[300],
          opacity: 1,
        },

        "&:-ms-input-placeholder": {
          color: wellColors.elixir[300],
        },

        "&::-ms-input-placeholder": {
          color: wellColors.elixir[300],
        },

        "&:-webkit-autofill": {
          transition: "background-color 600000s 0s, color 600000s 0s",
        },
        "&:-webkit-autofill:focus": {
          transition: "background-color 600000s 0s, color 600000s 0s",
        },
      },
    },
  },
  palette: {
    primary: {
      light: wellColors.zen[50],
      main: wellColors.zen[500],
      dark: wellColors.zen[900],
    },
    secondary: {
      light: wellColors.zen[50],
      main: wellColors.zen[50],
      dark: wellColors.zen[100],
      contrastText: wellColors.zen[900],
    },
    error: {
      main: wellColors.bloom[800],
    },
  },
};

const setUserId = async (id?: string | null) => {
  if (id === null) {
    analytics.setUser(null);
    return;
  }

  try {
    const response = await AccountsAPI.getAccount();
    const data: TAccount = response.data;
    analytics.setUser(data.userId);
  } catch (err) {
    console.error(err);
  }
};

const App = () => {
  const { update } = useIntercom();
  const { authenticatedState, email } = useAuthentication();

  const isAuthenticated = authenticatedState === AUTHENTICATED_STATE.YES;

  useEffect(() => {
    if (isAuthenticated) {
      update({ email });
    }
  }, [isAuthenticated, email, update]);

  useEffect(() => {
    authenticatedState === AUTHENTICATED_STATE.YES && setUserId();
    authenticatedState === AUTHENTICATED_STATE.NO && setUserId(null);
  }, [authenticatedState]);

  return (
    <ThemeProvider themeName={"services"} custom={onlineCustomTheming}>
      <CssBaseline />
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ScrollToTop />
          <OnlineRoutes />
        </Router>
      </PersistGate>
    </ThemeProvider>
  );
};
export default App;

//da52ad01-21dc-46aa-915b-3d4c79e9bf6d
