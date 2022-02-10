import React from "react";
import { Typography } from "@material-ui/core";

export interface SubheadingProps {
  className: string;
}

const Subheading: React.FC<SubheadingProps> = (props) => {
  return (
    <Typography variant="h4" className={props.className}>
      {props.children}
    </Typography>
  );
};

export default Subheading;
