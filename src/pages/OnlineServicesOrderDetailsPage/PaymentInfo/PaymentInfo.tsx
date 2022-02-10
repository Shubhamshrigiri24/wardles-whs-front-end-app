import React, { useCallback } from "react";
import { Box, Link } from "@material-ui/core";
import { Typography, Alert } from "@welldigital/components";
import { Payment } from "pages/OnlineServicesOrderDetailsPage/types";
import { useStyles } from "pages/OnlineServicesOrderDetailsPage/styles";

interface Props {
  payment?: Payment | null;
}

export const PaymentInfo: React.FC<Props> = ({ payment }) => {
  const classes = useStyles();

  const handleTryAgain = useCallback(() => {
    // TODO: Add implementation
  }, []);

  const handleChangePaymentMethod = useCallback(() => {
    // TODO: Add implementation
  }, []);

  return payment ? (
    <>
      <Typography className={classes.subTitle} spacingAfter={2}>
        Payment method
      </Typography>
      <Typography spacingAfter={2}>{payment.cardNumber}</Typography>
      <Box mb={4}>
        <Link className={classes.link} onClick={handleChangePaymentMethod}>
          Change your payment method
        </Link>
      </Box>
      {payment.hasError && (
        <Alert
          message={
            <Typography
              color={"inherit"}
              variant={"subtitle2"}
              spacingAfter={1}
            >
              There has been a problem with your payment
            </Typography>
          }
          action={{
            onClick: handleTryAgain,
            children: "Retry",
          }}
          type={"error"}
          spacingAfter={4}
        />
      )}
    </>
  ) : null;
};

export default PaymentInfo;
