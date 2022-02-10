import React, { FC, ReactNode, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Theme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Collapse,
} from "@material-ui/core";
import { Person, Phone, ExpandMore, LocationOn } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { TAccount } from "app/store/reducer/account/types";
import { wellColors, Typography } from "@welldigital/components";
import { formatDateFromIso } from "utils/formatters";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 10,
    borderColor: wellColors.greyscale[500],
  },
  cardContentWrapper: {
    padding: "10px 16px !important",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      padding: "32px 24px !important",
    },
  },
  cardCollapseTrigger: {
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    right: "0",
    padding: "0 16px",
    zIndex: 10,
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardList: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  cardListItem: {
    padding: "0 0 0 28px",
    margin: "0",
    "&:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
  cardListSubHeader: {
    display: "flex",
    color: wellColors.elixir[900],
    marginBottom: "12px",
  },
  cardListSubHeaderText: {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "150%",
  },
  cardListSubHeaderIcon: {
    marginRight: "4px",
  },
  cardListSubHeaderHasClick: {
    [theme.breakpoints.down("sm")]: {
      cursor: "pointer",
    },
  },
  cardListItemHeader: {
    color: wellColors.elixir[600],
  },
  cardListItemSubheader: {
    display: "block",
    fontWeight: 600,
    fontSize: "14px",
    color: wellColors.elixir[900],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  cardListItemText: {
    display: "block",
    fontWeight: 400,
    fontSize: "16px",
    color: wellColors.elixir[400],
    overflowWrap: "break-word",
  },
}));

export type AccountOverviewSideCardProps = {
  data: TAccount | null;
};

const AccountOverviewSideCard: FC<AccountOverviewSideCardProps> = ({
  data,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCollapse = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <Card variant={"outlined"} classes={{ root: classes.card }}>
      <CardContent classes={{ root: classes.cardContentWrapper }}>
        {!data && (
          <Typography className={classes.cardListItemHeader} align={"center"}>
            No data
          </Typography>
        )}
        {data && (
          <>
            {!isDesktop && (
              <div
                className={classes.cardCollapseTrigger}
                onClick={handleCollapse}
              >
                <ExpandMore
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isOpen,
                  })}
                />
              </div>
            )}
            <Collapse
              in={isDesktop ? true : isOpen}
              timeout={"auto"}
              collapsedHeight={"24px"}
            >
              <List
                className={classes.cardList}
                component={"ul"}
                disablePadding
              >
                <ListSubheader
                  disableSticky
                  disableGutters
                  className={clsx(
                    classes.cardListSubHeader,
                    classes.cardListSubHeaderHasClick
                  )}
                >
                  <Person className={classes.cardListSubHeaderIcon} />
                  <Typography
                    className={classes.cardListSubHeaderText}
                    color={"inherit"}
                  >
                    Personal details
                  </Typography>
                </ListSubheader>
                <CardListItem
                  primary={`${data.firstName} ${data.lastName}`}
                  secondary={formatDateFromIso(data.dob, "dd/MM/yyyy")}
                />
              </List>
              <List
                className={classes.cardList}
                component={"ul"}
                disablePadding
              >
                <ListSubheader
                  disableSticky
                  disableGutters
                  className={classes.cardListSubHeader}
                >
                  <Phone className={classes.cardListSubHeaderIcon} />
                  <Typography
                    className={classes.cardListSubHeaderText}
                    color={"inherit"}
                  >
                    Contact details
                  </Typography>
                </ListSubheader>
                <CardListItem primary={"Email"} secondary={data.email} />
                <CardListItem primary={"Phone number"} secondary={data.phone} />
                <CardListItem
                  primary={"Registered address"}
                  secondary={`${data.addressline1} ${data.addressline2} ${data.postcode} ${data.city}`}
                />
              </List>
              <List
                className={classes.cardList}
                component={"ul"}
                disablePadding
              >
                <ListSubheader
                  disableSticky
                  disableGutters
                  className={classes.cardListSubHeader}
                >
                  <LocationOn className={classes.cardListSubHeaderIcon} />
                  <Typography
                    className={classes.cardListSubHeaderText}
                    color={"inherit"}
                  >
                    GP details
                  </Typography>
                </ListSubheader>
                <CardListItem primary={""} secondary={data.gpDetails} />
              </List>
            </Collapse>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export type CardListItemProps = {
  icon?: ReactNode;
  primary?: string;
  secondaryHeader?: string;
  secondary?: string;
};

const CardListItem: FC<CardListItemProps> = ({
  primary,
  secondary,
  secondaryHeader,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      className={classes.cardListItem}
      component={"li"}
      alignItems={"flex-start"}
      disableGutters
    >
      <ListItemText
        style={{ whiteSpace: "pre-line", margin: "0" }}
        primary={
          <Typography
            component={"span"}
            className={classes.cardListItemHeader}
            variant={"body2"}
          >
            {primary}
          </Typography>
        }
        secondary={
          <>
            {secondaryHeader && (
              <Typography
                component={"span"}
                className={classes.cardListItemSubheader}
              >
                {secondaryHeader}
              </Typography>
            )}
            <Typography component={"span"} className={classes.cardListItemText}>
              {secondary}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default AccountOverviewSideCard;
