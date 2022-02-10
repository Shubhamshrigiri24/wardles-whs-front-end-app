import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { wellColors } from "@welldigital/components";

export type FeatureProps = {
  icon?: React.ElementType;
  title: string;
  description: string;
  links?: IFeatureLink[];
};

export interface IFeatureLink {
  label: string;
  href: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "&:not(:last-child)": {
      marginBottom: "30px",
    },
  },
  main: {
    display: "flex",
    marginBottom: "2px",
  },
  icon: {
    color: wellColors.zen[500],
    marginRight: "10px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    color: wellColors.elixir[900],
    marginBottom: "6px",
  },
  description: {
    fontWeight: 500,
    fontSize: "16px",
    color: wellColors.elixir[300],
    lineHeight: "150%",
  },
  links: {
    display: "flex",
    marginTop: "26px",
  },
  link: {
    textDecoration: "none",
    color: wellColors.zen[500],
    fontSize: "16px",
    fontWeight: 600,
    "&:not(:last-child)": {
      marginRight: "30px",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const Feature: React.FC<FeatureProps> = ({
  icon: Icon,
  title,
  description,
  links,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {Icon && (
          <div className={classes.icon}>
            <Icon />
          </div>
        )}
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.description}>{description}</div>
      {links && (
        <div className={classes.links}>
          {links.map(({ label, href }, k) => (
            <a
              key={k}
              className={classes.link}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
