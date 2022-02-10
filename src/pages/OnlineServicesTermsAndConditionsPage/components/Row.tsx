import React from "react";
import clsx from "clsx";
import { Typography } from "@welldigital/components";
import { useStyles } from "pages/OnlineServicesTermsAndConditionsPage/styles";

export type RowProps = {
  number?: string;
  boldText?: string;
  isSubtitle?: boolean;
};

export const Row: React.FC<RowProps> = ({
  number,
  boldText,
  isSubtitle,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div style={{ width: "4%" }}>
        <Typography className={clsx(isSubtitle && classes.bold)}>
          {number}
        </Typography>
      </div>

      <Typography
        className={clsx(isSubtitle && classes.boldUppercase)}
        style={{ width: "96%" }}
      >
        {boldText && (
          <span className={classes.bold}>
            {boldText}
            {` `}
          </span>
        )}
        {children}
      </Typography>
    </div>
  );
};

export default Row;
