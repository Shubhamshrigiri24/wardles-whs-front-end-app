import React from "react";
import clsx from "clsx";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Typography, Alert, Divider } from "@welldigital/components";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";
import { useStyles as useStatusStyles } from "pages/OnlineServicesOrderDetailsPage/SubscriptionStatusInfo/RenderCancelled";

interface Props {}

export const RenderPaymentIssue: React.FC<Props> = () => {
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
              Subscription couldn’t be confirmed
            </Typography>
            <Typography className={classes.description}>
              We were unable to set up your subscription due to an error with
              your payment and you have not been charged. Check your payment
              details are correct before trying to pay again or use an
              alternative payment method.
            </Typography>
          </>
        }
        icon={CreditCardIcon}
        className={clsx(classes.warningAlert, classes.alertRoot)}
        spacingAfter={4}
      />
      <Divider />
    </>
  );
};

export default RenderPaymentIssue;
