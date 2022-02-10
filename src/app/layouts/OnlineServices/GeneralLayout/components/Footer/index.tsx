import React, { FC } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Divider,
  Container,
} from "@material-ui/core";
import { wellColors, Typography } from "@welldigital/components";
import NHS from "./nhs.svg";
import Well from "./Well.svg";
import WellLogo from "./WellLogo.svg";

export const headerHeight: number = 80;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 500,
      color: wellColors.elixir[300],
    },
    upperSection: {
      display: "flex",
      margin: theme.spacing(14, 0, 15),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        margin: theme.spacing(3, 0),
      },
    },
    lowerSection: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(14, 0, 3),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        margin: theme.spacing(3, 0),
      },
    },
    upperCaptionContainer: {
      width: "372px",
      marginRight: theme.spacing(17),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: theme.spacing(5),
      },
    },
    lowerCaptionContainer: {
      width: "714px",
      marginRight: theme.spacing(7),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: theme.spacing(7),
      },
    },
    linksList: {
      marginRight: theme.spacing(17),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(7),
      },
    },
    links: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(1),
      },
    },
    supportEmail: {
      color: wellColors.elixir[900],
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(10),
      },
    },
    logo: {
      marginRight: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(3),
      },
    },
    logoContainer: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(3),
        width: "100%",
      },
    },
    wellLogo: {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(4),
      },
      marginBottom: theme.spacing(7),
    },
    linkStyle: {
      textDecoration: "none",
      color: wellColors.elixir[900],
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const Footer: FC<{}> = () => {
  const classes = useStyles();
  return (
    <div>
      <Divider />
      <Container maxWidth={"lg"}>
        <div className={classes.upperSection}>
          <div className={classes.upperCaptionContainer}>
            <a href={"https://www.well.co.uk/"}>
              <img
                src={WellLogo}
                alt={"wellLogo"}
                className={classes.wellLogo}
              />
            </a>
            <Typography className={classes.caption} spacingAfter={2}>
              This content was written and edited by Well. Our health
              information is evidence based, up-to-date and reviewed by health
              professionals. It isn’t intended to replace the medical
              information given to you by your doctor.
            </Typography>
            <Typography className={classes.caption}>
              We aim to provide you with the knowledge and support you need to
              make confident decisions about your health and wellbeing.
            </Typography>
          </div>
          <div className={classes.linksList}>
            <Typography className={classes.links}>
              <a
                href={
                  "https://www.well.co.uk/about-us/policies/terms-and-conditions-vaccination-services"
                }
                className={classes.linkStyle}
              >
                Terms and conditions
              </a>
            </Typography>
            <Typography className={classes.links}>
              <a
                href={"https://www.well.co.uk/about-us/policies/privacy"}
                className={classes.linkStyle}
              >
                Privacy policy
              </a>
            </Typography>
            <Typography className={classes.links}>
              <a
                href={"https://www.well.co.uk/about-us/policies/cookies"}
                className={classes.linkStyle}
              >
                Cookies
              </a>
            </Typography>
          </div>
          <div className={classes.supportEmail}>
            <Typography>For support email</Typography>
            <Typography>
              <a
                href={"mailto:hello@well.co.uk"}
                className={classes.linkStyle}
              >
                hello@well.co.uk
              </a>
            </Typography>
          </div>
        </div>
      </Container>
      <Divider />
      <Container maxWidth={"lg"}>
        <div className={classes.lowerSection}>
          <div className={classes.lowerCaptionContainer}>
            <Typography className={classes.caption} spacingAfter={2}>
              Bestway National Chemists Limited is registered in England and
              Wales, trading as Well and Well Pharmacy. Our online pharmacy
              (well.co.uk) registration number is 9010492 and the registered
              pharmacy address is: Well, Healthcare Service Centre, Meir Park,
              Stoke-on-Trent, Staffordshire, ST3 7UN.
            </Typography>
            <Typography className={classes.caption} spacingAfter={2}>
              If you would like to know who the Responsible Pharmacist is at any
              given time, please email nhspharmacy.stoke.well.co.ukfap20@nhs.net
              or call 01782 597313. You can also contact the pharmacy on
              hello@well.co.uk.
            </Typography>
            <Typography className={classes.caption}>
              Our Superintendent Pharmacist is Iftkhar Ahmad Khan, FRPharmS.
              GPhC Registration Number: 2041286. You can find out more about
              checking if an online pharmacy is operating legally from the
              General Pharmaceutical Council (GPhC).
            </Typography>
          </div>
          <div className={classes.logoContainer}>
            <a href={"https://www.nhs.uk/"}>
              <img src={NHS} alt={"nhs"} className={classes.logo} />
            </a>
            <a href={"https://www.legitscript.com/websites/well.co.uk"}>
              <img src={Well} alt={"well"} className={classes.logo} />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
