import React from "react";
import { makeStyles, Theme, Typography, Divider } from "@material-ui/core";
import WellLogo from "./Well.svg";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: theme.spacing(14),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(12),
      justifyContent: "flex-start",
      padding: theme.spacing(2, 3),
    },
    color: "#65727D",
    paddingLeft: theme.spacing(19),
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  divider: {
    width: "100%",
  },
  wellLogo: {
    maxHeight: "35px",
    maxWidth: "90px",
    objectFit: "contain",
    paddingBottom: theme.spacing(1),
  },
  textContainer: {
    marginLeft: theme.spacing(2),
  },
}));

const OrderConfirmationPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <img src={WellLogo} alt="WellLogo" className={classes.wellLogo} />
        <div className={classes.textContainer}>
          <Typography>Pharmacy Services</Typography>
        </div>
      </div>
      <Divider className={classes.divider} />
    </>
  );
};

export default OrderConfirmationPage;
