import React, { FC, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  Typography,
  Modal,
  Button,
  Spacing,
  wellColors,
} from "@welldigital/components";
import { useStyles } from "./styles";

export type AppModalProps = {
  isOpen: boolean;
  title?: string;
  backLabel?: string;
  successLabel?: string;
  onSuccess: () => void;
  onBack: () => void;
};

const AppModal: FC<AppModalProps> = ({
  isOpen,
  title = "",
  backLabel = "Back",
  successLabel = "Continue",
  children,
  onSuccess,
  onBack,
}) => {
  const classes = useStyles();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const onInternalSuccess = useCallback(async () => {
    setIsBusy(true);
    await onSuccess();
    setIsBusy(false);
  }, [onSuccess]);

  const onInternalBack = useCallback(async () => {
    setIsBusy(true);
    await onBack();
    setIsBusy(false);
  }, [onBack]);

  return isOpen ? (
    <Modal
      width={576}
      open={isOpen}
      onClose={onInternalBack}
      maxWidth={"xs"}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <Spacing spacing={2} />
      <Typography
        variant={"h3"}
        align={"center"}
        spacingAfter={2}
        className={classes.title}
        data-testid={"appModal/title"}
      >
        {title}
      </Typography>
      <div className={classes.body}>{children}</div>
      <Grid container justify={"center"} alignItems={"center"} spacing={2}>
        <Grid item>
          <Button
            onClick={onInternalBack}
            disabled={isBusy}
            variant={"text"}
            color={"default"}
            className={classes.backButton}
            data-testid={"appModal/backButton"}
          >
            <Typography style={{ color: wellColors.elixir[900] }}>
              {backLabel}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={onInternalSuccess}
            loading={isBusy}
            variant={"contained"}
            color={"primary"}
            endIcon={<ChevronRight />}
            data-testid={"appModal/successButton"}
          >
            {successLabel}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  ) : null;
};

export default AppModal;
