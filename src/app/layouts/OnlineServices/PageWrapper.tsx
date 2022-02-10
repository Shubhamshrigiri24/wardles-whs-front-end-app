import React, { ReactNode } from "react";
import {
  Container,
  Divider,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    height: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(8),
    },
  },
  divider: {
    width: "100%",
  },
  iconContainer: {
    marginRight: theme.spacing(5),
    "&:hover": {
      background: "none",
    },
  },
  iconColour: {
    color: "black",
  },
}));

const getCloseRoute = () => {
  window.history.back();
};

const OnlineServicesPageWrapper: React.FC<{
  children?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}> = ({ children, maxWidth = "md" }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <IconButton
          className={classes.iconContainer}
          data-testid={"close"}
          onClick={() => getCloseRoute()}
        >
          <CloseIcon height="21px" className={classes.iconColour} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <Container
        className={classes.container}
        maxWidth={maxWidth}
        disableGutters
      >
        {children as Element}
      </Container>
    </div>
  );
};

export default OnlineServicesPageWrapper;
