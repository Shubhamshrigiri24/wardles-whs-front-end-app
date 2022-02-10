import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@welldigital/ui-common/Utils/polyfills";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntercomProvider } from "react-use-intercom";

import { analytics } from "@welldigital/ui-common/Analytics";
import { AuthenticationProvider } from "@welldigital/ui-common/Authentication";

import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

import { store } from "./app/store";

import { LOGIN_TARGET } from "constants/login";

import "@welldigital/components/font/index.css";

analytics.init();

const intercomAppId: string = process.env.REACT_APP_INTERCOM_APP_ID || "";

ReactDOM.render(
  <React.StrictMode>
    <IntercomProvider
      autoBoot
      appId={intercomAppId}
      autoBootProps={{ hideDefaultLauncher: true }}
    >
      <Provider store={store}>
        <AuthenticationProvider loginTarget={LOGIN_TARGET}>
          <App />
        </AuthenticationProvider>
      </Provider>
    </IntercomProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
