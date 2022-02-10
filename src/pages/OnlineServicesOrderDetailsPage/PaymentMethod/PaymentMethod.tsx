import React, { FC } from "react";
import { useStyles as useSharedStyles } from "pages/OnlineServicesOrderDetailsPage/styles";
import { Typography, Alert } from "@welldigital/components";

export type PaymentMethodProps = {
  lastFour: string;
  braintreeToken: string | null | undefined;
  braintreeTokenErrorMessage: string;
  onChangePaymentMethod: () => void;
};

export const PaymentMethod: FC<PaymentMethodProps> = ({
  lastFour,
  braintreeToken,
  braintreeTokenErrorMessage,
  onChangePaymentMethod,
}) => {
  const classes = { ...useSharedStyles() };

  return (
    <>
      <Typography className={classes.subTitle} spacingAfter={1}>
        Payment method
      </Typography>
      {braintreeTokenErrorMessage && (
        <Alert
          type={"error"}
          spacingAfter={1}
          message={braintreeTokenErrorMessage}
          data-testid={"alert/message"}
        />
      )}
      {braintreeToken && (
        <>
          {lastFour && (
            <Typography
              className={classes.paragraph}
              spacingAfter={1}
              data-testid={"paymentMethod/lastFour"}
            >
              XXXX XXXX XXXX {lastFour}
            </Typography>
          )}

          <Typography
            className={classes.link}
            spacingAfter={4}
            onClick={onChangePaymentMethod}
            data-testid={"paymentMethod/change"}
          >
            Change your payment method
          </Typography>
        </>
      )}
    </>
  );
};

export default PaymentMethod;
