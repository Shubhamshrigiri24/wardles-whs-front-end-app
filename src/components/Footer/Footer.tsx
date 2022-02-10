import React, { FC } from "react";
import {
  Typography,
  Theme,
  makeStyles,
  Link as MuiLink,
  Container,
} from "@material-ui/core";

import Logo from "../Logo/Logo";

export const footerHeight = 240;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: "relative",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    minHeight: footerHeight,
    clear: "both",
    width: "100%",
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 1),
    },
  },
  footerContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  section: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(4),
    },
  },
  logoContainer: {
    flex: 0.5,
  },
  feedbackContainer: {
    flex: 2,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(8),
    },
  },
  linksContainer: {
    flex: 0.8,
  },
  link: {
    textDecoration: "none",
    color: "#FFFFFF",
  },
}));

const Footer: FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth={"lg"} className={classes.footerContainer}>
        <section className={`${classes.section} ${classes.logoContainer}`}>
          <Logo />
        </section>
        <section className={`${classes.section} ${classes.feedbackContainer}`}>
          <Typography gutterBottom>
            This is a trial and your help is vital. If you have any feedback on
            how we could improve Pharmacy Services, please let us know.
          </Typography>
          <Typography variant={"h5"}>
            <MuiLink
              data-testid={"footer/link-to-feedback"}
              className={classes.link}
              href="https://docs.google.com/forms/d/e/1FAIpQLSflwFAsIn5HsTHIBOg2rLDqZmrB0DEiLa0c0_Z_X8NbsOlrjw/viewform?usp=sf_link"
              target={"_blank"}
            >
              Give Feedback
            </MuiLink>
          </Typography>
        </section>
        <section className={`${classes.section} ${classes.linksContainer}`}>
          <Typography gutterBottom>Policies</Typography>
          <Typography variant={"h5"}>
            <MuiLink
              data-testid={"footer/link-to-t-and-c"}
              className={classes.link}
              href={
                "https://www.well.co.uk/about-us/policies/terms-and-conditions-vaccination-services"
              }
              target={"_blank"}
            >
              Terms and conditions
            </MuiLink>
          </Typography>
          <Typography variant={"h5"}>
            <MuiLink
              data-testid={"footer/link-to-privacy-policy"}
              className={classes.link}
              href={"https://www.well.co.uk/about-us/policies/privacy"}
              target={"_blank"}
            >
              Privacy policy
            </MuiLink>
          </Typography>
          <Typography variant={"h5"}>
            <MuiLink
              data-testid={"footer/link-to-cookies"}
              className={classes.link}
              href={"https://www.well.co.uk/about-us/policies/cookies"}
              target={"_blank"}
            >
              Cookies
            </MuiLink>
          </Typography>
        </section>
        <section className={`${classes.section} ${classes.linksContainer}`}>
          <Typography gutterBottom>For support</Typography>
          <Typography variant={"h5"}>
            <MuiLink
              data-testid={"footer/link-to-help"}
              className={classes.link}
              href="mailto:hello@well.co.uk"
              target={"_blank"}
            >
              hello@well.co.uk
            </MuiLink>
          </Typography>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
