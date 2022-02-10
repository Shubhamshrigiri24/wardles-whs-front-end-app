import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Input, Typography, Button, Divider } from "@welldigital/components";
import { analytics } from "@welldigital/ui-common/Analytics";

import events from "utils/events";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";
import { OrderDetailsProduct } from "pages/OnlineServicesOrderDetailsPage/types";
import { UpdateSubscriptionHealthStatusPayload } from "utils/api/SubscriptionsAPI";

import { updateSubscriptionHealthStatus } from "app/store/reducer/subscriptions/actions";

export type RenderCustomerConfirmationProps = {
  performPageDataRefetch: () => void;
  onError: React.Dispatch<React.SetStateAction<string>>;
  product: OrderDetailsProduct;
};

export const RenderCustomerConfirmation: React.FC<RenderCustomerConfirmationProps> =
  ({ performPageDataRefetch, onError, product }) => {
    const [value, setValue] = useState("");
    const [isButtonBusy, setIsButtonBusy] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    const handleValueChange = useCallback(
      (value: string) => setValue(value),
      []
    );

    const sendSubscriptionHealthStatus = useCallback(async () => {
      const payload: UpdateSubscriptionHealthStatusPayload = {
        subscriptionId: id,
        details: value,
      };

      analytics.trackEvent({
        flow: "subscription",
        event: events.subscription.submitHealthStatusConfirmation,
        metadata: {
          subscription: {
            sku: product.sku,
            hasHealthStatusChanged: true,
          },
        },
      });

      setIsButtonBusy(true);

      dispatch(updateSubscriptionHealthStatus(payload))
        .then(() => {
          performPageDataRefetch();
        })
        .catch((e: string) => {
          onError(
            "An error occured when sending cofirmation. Please try again"
          );
        })
        .finally(() => {
          setIsButtonBusy(false);
        });
    }, [id, value, onError, dispatch, product.sku, performPageDataRefetch]);

    return (
      <>
        <Typography className={classes.subTitle} spacingAfter={2}>
          Has anything changed with your health since your last subscription?
        </Typography>
        <Typography className={classes.paragraph} spacingAfter={2}>
          It’s important to only continue taking your medication if it’s still
          safe for you to do so. Please advise us if there have been any changes
          to your health since you last recieved your subscription.
        </Typography>

        <Typography className={classes.paragraph} spacingAfter={3}>
          We will then send a message to your pharmacist to review the changes.
        </Typography>
        <Box mb={4}>
          <Input
            multiline
            fullWidth
            value={value}
            onChange={handleValueChange}
            inputProps={{
              className: classes.healthStatusInput,
            }}
            FormHelperTextProps={{
              style: { marginLeft: 0 },
            }}
            placeholder={"Please enter here"}
          />
        </Box>

        <Button
          size={"large"}
          color={"primary"}
          fullWidth
          endIcon={<ChevronRight />}
          loading={isButtonBusy}
          disabled={!(value.length > 0)}
          onClick={sendSubscriptionHealthStatus}
        >
          Send information
        </Button>

        <Divider spacingBefore={4} />
      </>
    );
  };

export default RenderCustomerConfirmation;
