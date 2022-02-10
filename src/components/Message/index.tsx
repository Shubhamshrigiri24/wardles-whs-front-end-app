import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import classNames from "clsx";

export type MessageProps = {
  message: string | JSX.Element | JSX.Element[];
  type?: "default" | "info";
  icon?: Function;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#F4F4F4",
    borderRadius: "8px",
    display: "flex",
    padding: "24px 30px 24px 0",
  },
  infoType: {
    backgroundColor: "#E0ECFD",
  },
  icon: {
    fontSize: "14px",
    flex: "0 0 auto",
    width: "72px",
    display: "flex",
    justifyContent: "center",
    color: "#65727D",
    margin: "-1px 0",

    "$infoType &": {
      color: "#0061F2",
    },
  },
  message: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0C161F",
    lineHeight: "21px",

    "$infoType &": {
      color: "#0061F2",
    },
  },
}));

export const Message: React.FC<MessageProps> = ({
  className,
  type,
  message,
  icon,
}) => {
  const classes = useStyles();
  const Icon = icon || ErrorIcon;
  return (
    <div
      className={classNames(classes.root, className, {
        [classes.infoType]: type === "info",
      })}
    >
      <div className={classes.icon}>
        <Icon />
      </div>
      <div className={classes.message}>{message}</div>
    </div>
  );
};
