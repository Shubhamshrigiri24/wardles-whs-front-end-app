import React from "react";
import { Typography, Alert, Divider } from "@welldigital/components";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";
import { useStyles as useStatusStyles } from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderCancelled";

interface Props {}

export const RenderPharmacistApproval: React.FC<Props> = () => {
  const classes = { ...useStyles(), ...useStatusStyles() };
  return (
    <>
      <Alert
        message={
          <>
            <Typography
              className={classes.title}
              variant={"h4"}
              spacingAfter={1}
            >
              We’ve temporarily paused your order
            </Typography>
            <Typography className={classes.description}>
              We’ve temporarily paused your order whilst our pharmacist reviews
              your recent health changes. This is to make sure it’s safe for you
              to continue taking your medication. Once the review has taken
              place, we will either resume your order or the pharmacist will be
              in touch to go through other options.
            </Typography>
          </>
        }
        icon={WatchLaterIcon}
        className={classes.warningAlert}
        spacingAfter={4}
      />
      <Divider />
    </>
  );
};

export default RenderPharmacistApproval;
