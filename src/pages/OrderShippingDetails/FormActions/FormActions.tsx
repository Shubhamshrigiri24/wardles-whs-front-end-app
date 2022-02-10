import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Button, Typography, wellColors } from "@welldigital/components";
import { useStyles } from "pages/OrderShippingDetails/styles";
import {
  useAuthentication,
  AUTHENTICATED_STATE,
} from "@welldigital/ui-common/Authentication";
import { useProduct } from "app/store/hooks";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";
import { useFormContext } from "hooks";

export type FormActionsProps = {};

export const FormActions: React.FC<FormActionsProps> = () => {
  const history = useHistory();
  const product = useProduct();
  const classes = useStyles({ pageContainer: { padding: "50px 0" } });
  const { form } = useFormContext();
  const { authenticatedState } = useAuthentication();
  const isAuthenticated = authenticatedState === AUTHENTICATED_STATE.YES;

  useEffect(() => {
    const fieldsWithErrors = Object.keys(form.errors);
    if (fieldsWithErrors.length > 1) {
      analytics.trackEvent({
        flow: "ed",
        event: isAuthenticated
          ? eventsBuilder.orderDetailsForm.existingUser
              .deliveryDetailsValidationError
          : eventsBuilder.orderDetailsForm.newUser
              .accountDetailsValidationError,
        metadata: {
          error: `Validation failed for the following fields: ${fieldsWithErrors.join(
            ", "
          )}`,
        },
      });
    }
  }, [form.errors, product, isAuthenticated]);

  return (
    <div className={classes.flexContainer}>
      <Button variant={"text"} color={"default"} onClick={history.goBack}>
        <Typography style={{ color: wellColors.elixir[900] }}>Back</Typography>
      </Button>
      <Button
        fullWidth
        size={"large"}
        type={"submit"}
        color={"primary"}
        endIcon={<ChevronRight />}
      >
        Next
      </Button>
    </div>
  );
};

export default FormActions;
