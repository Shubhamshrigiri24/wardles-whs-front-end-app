import React, { ChangeEvent, useCallback, useState } from "react";
import {
  makeStyles,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "clsx";
import BestValueTag from "../BestValueTag";

export type ProductProps = IProduct & {
  checked?: boolean;
  onCheck?: () => void;
};

export interface IProduct {
  id: string;
  imageSrc: string;
  title: string;
  analyticsTitle: string;
  description: string;
  moreInfo?: JSX.Element;
  isBestValue?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: "1px solid #ECECEC",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "&:not(:last-child)": {
      marginBottom: "30px",
    },
  },
  inner: {
    border: "1px solid transparent",
    borderRadius: "3px",
    "$selected &": {
      borderColor: "#0059F0",
    },
  },
  selected: {
    borderColor: "#0059F0",
  },
  container: {
    display: "flex",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "20px",
    },
  },
  image: {
    flex: "0 0 auto",
    width: "166px",
    "& img": {
      display: "block",
      maxWidth: "100%",
    },
  },
  main: {
    flex: 1,
    marginLeft: "30px",
    padding: "10px 0",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      marginTop: "20px",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
  },
  description: {
    fontWeight: 600,
    fontSize: "14px",
  },
  bestValueTag: {
    marginTop: "15px",
  },
  checkboxContainer: {
    flex: "0 0 auto",
    width: "50px",
    marginLeft: "30px",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      marginTop: "15px",
    },
  },
  checkbox: {
    color: "#000 !important",
  },
  checkboxChecked: {
    color: "#0059F0 !important",
  },
  moreInfo: {
    borderTop: "1px solid #ECECEC",
    fontSize: "16px",
    "& a": {
      color: "#0061F2",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  accordion: {},
  accordionExpanded: {},
  accordionSummary: {
    fontWeight: "bold",
    fontSize: "16px",
    padding: "0 30px",
    "&, $accordionExpanded &": {
      minHeight: "76px",
    },
  },
  accordionDetails: {
    display: "block",
    padding: "0 30px",
  },
  accordionIcon: {
    transform: "rotate(180deg)",
  },
}));

export const Product: React.FC<ProductProps> = ({
  id,
  imageSrc,
  title,
  description,
  checked,
  onCheck,
  moreInfo,
  isBestValue,
}) => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(false);
  const handleCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked && typeof onCheck === "function") {
        onCheck();
      }
    },
    [onCheck]
  );

  return (
    <div
      className={classNames(classes.root, { [classes.selected]: checked })}
      data-testid={`product-${id}`}
    >
      <div className={classes.inner}>
        <div className={classes.container}>
          <div className={classes.image}>
            <img src={imageSrc} alt={title} />
          </div>
          <div className={classes.main}>
            <div className={classes.title}>{title}</div>
            <div className={classes.description}>{description}</div>
            {isBestValue && <BestValueTag className={classes.bestValueTag} />}
          </div>
          {typeof onCheck === "function" && (
            <div className={classes.checkboxContainer}>
              <Radio
                classes={{
                  root: classes.checkbox,
                  checked: classes.checkboxChecked,
                }}
                checked={checked}
                onChange={handleCheck}
              />
            </div>
          )}
        </div>
        {moreInfo && (
          <div className={classes.moreInfo}>
            <Accordion
              expanded={isExpanded}
              onChange={(ev, ex) => setExpanded(ex)}
              elevation={0}
              classes={{ expanded: classes.accordionExpanded }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                children={`More information about ${title}`}
                className={classes.accordionSummary}
              />
              <AccordionDetails className={classes.accordionDetails}>
                {moreInfo}
              </AccordionDetails>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.accordionIcon} />
                }
                onClick={() => setExpanded(false)}
                children={"Hide"}
                className={classes.accordionSummary}
              />
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};
