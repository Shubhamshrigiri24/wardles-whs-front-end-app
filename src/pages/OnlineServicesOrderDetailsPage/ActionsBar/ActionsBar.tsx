import React from "react";
import classNames from "clsx";
import { Grid, Link } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { SUBSCRIPTION_STATUSES } from "app/store/reducer/subscriptions/constants";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";

interface Props {
  isSubscription: boolean;
  isChangePaymentState?: boolean;
  subscriptionStatus?: keyof typeof SUBSCRIPTION_STATUSES;
  onBack: () => void;
  onCancelSubscriptionLinkClicked: () => void;
}

export const ActionsBar: React.FC<Props> = ({
  isSubscription,
  subscriptionStatus,
  isChangePaymentState,
  onBack,
  onCancelSubscriptionLinkClicked,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify={"space-between"}
      className={classes.actionsWrapper}
    >
      <Grid item>
        <Link
          className={classNames(classes.link, classes.backLink)}
          onClick={onBack}
        >
          <ChevronLeftIcon /> Back
        </Link>
      </Grid>
      {isSubscription &&
        !isChangePaymentState &&
        subscriptionStatus !== SUBSCRIPTION_STATUSES.CANCELLED && (
          <Grid item>
            <Link
              className={classNames(classes.link, classes.cancelLink)}
              onClick={onCancelSubscriptionLinkClicked}
            >
              Cancel Subscription
            </Link>
          </Grid>
        )}
    </Grid>
  );
};

export default ActionsBar;
