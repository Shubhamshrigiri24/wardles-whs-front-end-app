import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { createPortal } from "react-dom";
import { usePortal } from "../../components";

import { BannerContainer } from "./components/BannerContainer";

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    background: theme.palette.grey[500],
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(0, 4),
  },
  textContainer: {
    margin: theme.spacing(3, 3, 3, 0),
  },
  textColor: {
    color: theme.palette.grey["A700"],
  },
}));

export interface BannerProps {
  variant?: "warning";
}

const Banner: FC<BannerProps> = (props) => {
  const { variant = "warning", children } = props;
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <div className={classes.iconContainer}>
        {variant === "warning" && (
          <InfoOutlinedIcon className={classes.textColor} />
        )}
      </div>
      <div className={classes.textContainer}>
        <Typography
          data-testid={"banner/text-content"}
          className={classes.textColor}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
};

/**
 * Banner component that requires the BannerContainer to have been used somewhere
 * within the application as this relies on react portals.
 * Not using the BannerContainer would result in the banner being appended to
 * the`document.body` which would be undesired.
 * @example
 * // Banner container location
 * const BannerContainerLocation: FC = () => (
 *  <BannerContainer />
 * );
 * // Page where the banner is in regards to
 * const Page: FC = () => (
 *  <>
 *    <Banner>Banner Text</Banner>
 *    ...
 *  </>
 * );
 */
export const BannerPortals: React.FC<BannerProps> = (props) => {
  const banner = usePortal("banner-portal");
  const bannerMobile = usePortal("banner-portal-mobile");

  return (
    <>
      {createPortal(<Banner {...props} />, banner)}
      {createPortal(<Banner {...props} />, bannerMobile)}
    </>
  );
};

export default BannerPortals;
export { BannerContainer };
