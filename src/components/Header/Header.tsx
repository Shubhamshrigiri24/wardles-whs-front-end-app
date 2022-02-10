import React from "react";
import { Link } from "@material-ui/core";
import {
  Typography,
  Theme,
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import Logo from "../Logo/Logo";

export const headerHeight: number = 80;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: headerHeight,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logoColor: {
      color: theme.palette.secondary.light,
      margin: theme.spacing(2, 0, 0),
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Link
          data-testid={"header/link-to-home"}
          href="https://www.well.co.uk/services"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Toolbar>
            <Logo />
            <Typography className={classes.logoColor}>
              Pharmacy Services
            </Typography>
          </Toolbar>
        </Link>
      </AppBar>
    </div>
  );
};

export default Header;
