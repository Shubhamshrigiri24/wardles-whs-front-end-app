import React from "react";
import Header, { headerHeight } from "../../../components/Header/Header";
import Footer, { footerHeight } from "../../../components/Footer/Footer";
import { Container, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
  },
}));

const LoggedInLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <Container className={classes.container}>{children as Element}</Container>
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
