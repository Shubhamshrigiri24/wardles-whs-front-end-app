import React, {
  FC,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Typography, Button, Alert, wellColors } from "@welldigital/components";
import { generateBraintreeStyles } from "pages/OnlineServicesCheckoutPaymentPage/styles";
import ChevronRight from "@material-ui/icons/ChevronRight";
import BraintreeWebDropIn from "braintree-web-drop-in";
import SubscriptionsApi from "utils/api/SubscriptionsAPI";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "34px",
    color: wellColors.elixir[900],
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightMedium,
    color: wellColors.elixir[300],
  },

  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  braintreeContainer: {
    marginBottom: "16px",
    ...generateBraintreeStyles(theme),
  },
  braintreeInitSuccess: {
    minHeight: "270px",
  },
}));

export type ChangePaymentMethodProps = {
  brainTreeToken: string;
  subscriptionId: string;
  threeDSecure: any;
  onBack: () => void;
  performPageDataRefetch: () => void;
};

const braintreeContainerId = "braintree-change-payment-method";

export const ChangePaymentMethod: FC<ChangePaymentMethodProps> = ({
  brainTreeToken,
  threeDSecure,
  subscriptionId,
  onBack,
  performPageDataRefetch,
}) => {
  const classes = useStyles();
  const [changePaymentError, setChangePaymentError] = useState("");
  const [isChangingPayment, setIsChangingPayment] = useState(false);
  const [brainTreeInitError, setBraintreeInitError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const braintreeInstance = useRef<BraintreeWebDropIn.Dropin | null>(null);

  const handlePaymentChangeTracking = useCallback((errorMessage?: string) => {
    analytics.trackEvent({
      flow: "subscription",
      event:
        eventsBuilder.payment[
          errorMessage ? "paymentMethodUpdateFailed" : "paymentMethodUpdate"
        ],
      metadata: {
        ...(errorMessage ? { error: errorMessage } : {}),
      },
    });
  }, []);

  const onChangePaymentMethod = useCallback(async () => {
    setIsChangingPayment(true);
    if (changePaymentError) {
      setChangePaymentError("");
    }
    try {
      const methodPayload =
        await braintreeInstance.current?.requestPaymentMethod({
          threeDSecure,
        });

      if (!methodPayload) {
        throw new Error("Error on updating payment method");
      }

      if (!methodPayload.liabilityShifted) {
        braintreeInstance.current?.clearSelectedPaymentMethod();
        setChangePaymentError(
          "We were unable to complete your 3DSecure check, please try a different payment method"
        );
        handlePaymentChangeTracking("3DSecure check failed");
        setIsChangingPayment(false);
        return;
      }

      await SubscriptionsApi.updateSubscriptionPayment(subscriptionId, {
        paymentNonce: methodPayload.nonce,
        paymentMethodDetails: {
          last4: (methodPayload.details as Record<string, any>).lastFour,
        },
      });

      handlePaymentChangeTracking();
      setIsChangingPayment(false);
      onBack();
      performPageDataRefetch();
    } catch (err) {
      console.error(err);
      braintreeInstance.current?.clearSelectedPaymentMethod();
      setChangePaymentError("Error on updating payment method");
      handlePaymentChangeTracking("Error on updating payment method");
      setIsChangingPayment(false);
    }
  }, [
    subscriptionId,
    threeDSecure,
    changePaymentError,
    onBack,
    performPageDataRefetch,
    handlePaymentChangeTracking,
  ]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    async function createInstance() {
      braintreeInstance.current = await BraintreeWebDropIn.create({
        container: `#${braintreeContainerId}`,
        authorization: brainTreeToken,
        threeDSecure: true,
        vaultManager: true,
        card: {
          overrides: {
            styles: {
              input: {
                padding: "16px",
                color: wellColors.elixir[400],
              },
              ".number": {
                "font-family": "monospace",
                "font-weight": 500,
                "font-size": "18px",
              },
              "input:focus": {
                color: wellColors.elixir[400],
              },
            },
          },
        },
      });

      if (braintreeInstance.current.isPaymentMethodRequestable()) {
        setIsButtonDisabled(false);
      }

      braintreeInstance.current?.on("paymentMethodRequestable", () => {
        // this should always be false because when we have token with saved methods the event.paymentMethodIsSelected is true and when we don't have a payment method saved then  event.paymentMethodIsSelected is false , but in both cases we need to be able to press the button and is not reliable -- see braintree docs for further clarifications if needed
        //https://developer.paypal.com/braintree/docs/guides/drop-in/customization
        setIsButtonDisabled(false);
      });
      braintreeInstance.current?.on("noPaymentMethodRequestable", () => {
        setIsButtonDisabled(true);
      });
    }

    createInstance().catch((err) => {
      console.error("Could not begin change payment!", err);
      setBraintreeInitError(err.message ?? "Braintree init error!");
    });

    return () => {
      braintreeInstance.current?.teardown();
    };
  }, [brainTreeToken]);

  return (
    <div>
      <Typography className={classes.title} variant={"h2"} spacingAfter={2}>
        Payment
      </Typography>
      {brainTreeInitError && (
        <Alert message={brainTreeInitError} type={"error"} />
      )}
      {!brainTreeInitError && (
        <>
          <Typography className={classes.subTitle} spacingAfter={2}>
            Your card details will be saved securely and we will apply to take
            payment for your subscription every month.
          </Typography>
          <div className={classes.braintreeContainer}>
            <div id={braintreeContainerId} />
          </div>
          {changePaymentError && (
            <Alert
              type={"error"}
              spacingAfter={2}
              message={changePaymentError}
            />
          )}
          <div className={classes.flexContainer}>
            <Button variant={"text"} color={"default"} onClick={onBack}>
              <Typography style={{ color: wellColors.elixir[900] }}>
                Back
              </Typography>
            </Button>
            <Button
              fullWidth
              variant={"contained"}
              size={"large"}
              data-testid={"changePayment/payment-button"}
              color={"primary"}
              loading={isChangingPayment}
              disabled={isButtonDisabled}
              onClick={onChangePaymentMethod}
              endIcon={<ChevronRight />}
            >
              Change payment method
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePaymentMethod;
