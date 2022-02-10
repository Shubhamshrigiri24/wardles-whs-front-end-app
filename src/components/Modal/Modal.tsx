import React, { FC } from "react";
import {
  Dialog,
  Typography,
  makeStyles,
  Theme,
  DialogContent,
} from "@material-ui/core";

export interface ModalProps {
  title: string;
  text?: string;
  isOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  modalPadding: {
    padding: theme.spacing(5),
  },
  textRow: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Modal: FC<ModalProps> = ({ title, text, isOpen, children }) => {
  const classes = useStyles();

  return (
    <Dialog data-testid={"Modal-component"} open={isOpen} maxWidth={"xs"}>
      <DialogContent className={classes.modalPadding}>
        <Typography
          data-testid={"Modal-title-text"}
          className={classes.title}
          variant={"h5"}
        >
          {title}
        </Typography>
        {text && (
          <Typography
            data-testid={"Modal-body-text"}
            className={classes.textRow}
          >
            {text}
          </Typography>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
