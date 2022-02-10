import React from "react";
import classNames from "clsx";
import { Chip, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { wellColors } from "@welldigital/components";

export type BestValueTagProps = {
  className?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "0 10px",
    height: "40px",
    borderRadius: "20px",
    fontSize: "16px",
    color: wellColors.elixir[900],
  },
  icon: {
    width: "22px !important",
  },
}));

const BestValueTag: React.FC<BestValueTagProps> = ({ className }) => {
  const classes = useStyles();
  return (
    <Chip
      className={classNames(classes.root, className)}
      avatar={
        <svg
          className={classes.icon}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 11L19.56 8.21L19.9 4.52L16.29 3.7L14.4 0.5L11 1.96L7.6 0.5L5.71 3.69L2.1 4.5L2.44 8.2L0 11L2.44 13.79L2.1 17.49L5.71 18.31L7.6 21.5L11 20.03L14.4 21.49L16.29 18.3L19.9 17.48L19.56 13.79L22 11ZM9.09 15.72L5.29 11.91L6.77 10.43L9.09 12.76L14.94 6.89L16.42 8.37L9.09 15.72Z"
            fill="#0061F2"
          />
        </svg>
      }
      label="Best value"
      style={{ backgroundColor: "#E0ECFD" }}
    />
  );
};

export default BestValueTag;
