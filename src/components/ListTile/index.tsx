import React, { FC, Children, MouseEventHandler, ReactNode } from "react";
import { makeStyles, Theme, ButtonBase } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import classNames from "clsx";

import { Main } from "./components/Main";
import { Trailing } from "./components/Trailing";

export * from "./components/Main";
export * from "./components/Trailing";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
    display: "block",
    textAlign: "initial",
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor:
        theme.palette.type === "light"
          ? "rgba(0, 0, 0, 0.04)"
          : "rgba(255, 255, 255, 0.04)",
    },
  },
  selected: {
    backgroundColor:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.08)"
        : "rgba(255, 255, 255, 0.08)",
  },
  tile: {
    display: "flex",
  },
  tickContainer: {
    top: "50%",
    right: theme.spacing(2),
    position: "absolute",
    transform: "translateY(-50%)",
  },
}));

export interface ListTileProps {
  isButton?: boolean;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
}

const ListTile: FC<ListTileProps> = ({ children, isSelected }) => {
  const classes = useStyles();
  let main: ReactNode;
  let trailing: ReactNode;

  Children.forEach(children, (child) => {
    switch ((child as any).type) {
      case Trailing:
        trailing = child;
        break;
      case Main:
        main = child;
    }
  });

  return (
    <div className={classes.tile}>
      {main}
      {trailing}
      {isSelected && (
        <div className={classes.tickContainer}>
          <CheckIcon fontSize={"large"} />
        </div>
      )}
    </div>
  );
};

const ListTileWrapper: FC<ListTileProps> = ({
  children,
  isButton,
  isSelected,
  onClick,
  dataTestId,
}) => {
  const classes = useStyles();
  const buttonClases = classNames(classes.button, {
    [classes.selected]: isSelected,
  });

  if (isButton) {
    return (
      <ButtonBase
        disabled={!isButton}
        className={buttonClases}
        onClick={onClick}
        data-testid={dataTestId}
      >
        <ListTile isSelected={isSelected}>{children}</ListTile>
      </ButtonBase>
    );
  }
  return <ListTile isSelected={isSelected}>{children}</ListTile>;
};

export default ListTileWrapper;
