import React from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  makeStyles,
  Theme,
  CircularProgress,
  Container,
  Card,
} from "@material-ui/core";
import { Alert } from "@welldigital/components";

const useStyles = makeStyles((theme: Theme) => ({
  loadingSpinnerCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  pageMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
    },
  },
  card: {
    border: "none",
    background: "none",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: "0px",
    },
  },
}));

export interface PaymentPanelStateProps {
  paymentErrorMessage: string;
  disableButton: boolean;
  loading: boolean;
  isPaying: boolean;
}

export interface PaymentPanelDispatchProps {
  onPay(): void;
}

export type PaymentPanelProps = PaymentPanelStateProps &
  PaymentPanelDispatchProps;

const braintreeContainerId = "braintree_container";
export const BRAINTREE_CONTAINER_ID = `#${braintreeContainerId}`;

const PaymentPanel: React.FC<PaymentPanelProps> = ({
  disableButton,
  isPaying,
  loading,
  onPay,
  paymentErrorMessage,
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.pageMargin}>
      <Card className={classes.card}>
        <Typography variant="h3">Select a method of payment</Typography>
        <div id={braintreeContainerId} />
        {paymentErrorMessage && (
          <Alert type={"error"} message={paymentErrorMessage} />
        )}
        <Grid container>
          <Box mt={4}>
            <Button
              variant="contained"
              data-testid="paymentPanel/payment-button"
              color="primary"
              disabled={disableButton || isPaying}
              onClick={onPay}
            >
              {isPaying || loading ? (
                <div className={classes.loadingSpinnerCenter}>
                  <CircularProgress
                    size={"1em"}
                    className={classes.marginRight}
                  />
                  Paying...
                </div>
              ) : (
                "Pay"
              )}
            </Button>
          </Box>
        </Grid>
      </Card>
    </Container>
  );
};

export default PaymentPanel;
