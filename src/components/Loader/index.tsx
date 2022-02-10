import React from "react";

import { Theme, makeStyles } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    border: `16px solid ${wellColors.zen[100]}`,
    "border-radius": "50%",
    "border-top": `16px solid ${wellColors.zen[400]}`,
    width: "120px",
    height: "120px",
    animation: "$spin 2s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

export const Loader = () => {
  const classes = useStyles();
  return <div className={classes.loader}></div>;
};
