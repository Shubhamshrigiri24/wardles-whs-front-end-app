import React from "react";
import { Typography } from "@material-ui/core";

export interface HeadingProps {
  className?: string;
}

const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <Typography variant="h2" className={props.className}>
      {props.children}
    </Typography>
  );
};

export default Heading;
