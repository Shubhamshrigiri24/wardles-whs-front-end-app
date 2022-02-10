import React from "react";
import OnlineFooter from "components/OnlineFooter/OnlineFooter";
import {
  Button,
  Container,
  Divider,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import WellLogo from "../../components/OnlineFooter/WellLogo.svg";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  header: {
    padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(8),
    },
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  paragraph: {
    marginBottom: theme.spacing(3),
    color: "#65727D",
    fontSize: "18px",
  },
  divider: {
    width: "100%",
  },
  wellLogo: {
    width: "90px",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    height: "64px",
    fontSize: "16px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    "&:hover": {
      backgroundColor: "#000000cc",
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

const OnlinePageNotFound: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.header}>
        <Link href={"https://www.well.co.uk/"}>
          <img src={WellLogo} alt="WellLogo" className={classes.wellLogo} />
        </Link>
      </Container>
      <Divider className={classes.divider} />
      <Container className={classes.container} maxWidth="sm" disableGutters>
        <Typography variant="h2" component="h1" className={classes.title}>
          Sorry, we can’t find the page you’re looking for
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          This can happen if the link you opened isn't working, has moved or has
          been viewed before.
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          If you need any help or more information please email{" "}
          <Link href="mailto:support@well.co.uk" className={classes.link}>
            support@well.co.uk
          </Link>
          .
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          href={"https://www.well.co.uk/"}
        >
          Go to well.co.uk home
        </Button>
      </Container>
      <OnlineFooter />
    </div>
  );
};

export default OnlinePageNotFound;
