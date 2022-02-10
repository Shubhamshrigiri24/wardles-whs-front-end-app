import React, { FC } from "react";
import { Divider } from "@material-ui/core";
import Header from "app/layouts/OnlineServices/GeneralLayout/components/Header";
import Footer from "app/layouts/OnlineServices/GeneralLayout/components/Footer";

const GeneralLayout: FC<{}> = ({ children }) => {
  return (
    <div>
      <Header />
      <Divider />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
