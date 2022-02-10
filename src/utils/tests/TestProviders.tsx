import React from "react";
import "@testing-library/jest-dom/extend-expect";
import * as reactRedux from "react-redux";
import { AuthenticationProvider } from "@welldigital/ui-common/Authentication";
import { store } from "app/store";

const TestProviders: React.FC<{}> = ({ children }) => {
  return (
    <reactRedux.Provider store={store}>
      <AuthenticationProvider loginTarget={"online-services-web"}>
        {children}
      </AuthenticationProvider>
    </reactRedux.Provider>
  );
};

export default TestProviders;
