import React from "react";
import { Typography } from "@material-ui/core";

export interface TextProps {
  className?: string;
}

const Text: React.FC<TextProps> = (props) => {
  return (
    <Typography variant={"body1"} className={props.className}>
      {props.children}
    </Typography>
  );
};

export default Text;
