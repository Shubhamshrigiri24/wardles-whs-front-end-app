import React, { FC, useCallback } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, Tabs, Tab, Grid } from "@material-ui/core";
import {
  wellColors,
  DetailsCard,
  Typography,
  Spacing,
} from "@welldigital/components";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { TOrders } from "app/store/reducer/orders/types";

const useStyles = makeStyles((theme: Theme) => ({
  tabsWrapper: {
    width: "100%",
  },
  indicator: {
    backgroundColor: wellColors.elixir[900],
    height: "4px",
  },
  tabRoot: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 600,
    padding: 0,
    minHeight: 32,
    minWidth: "auto !important",
    marginBottom: theme.spacing(2),
    "&:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tabsRoot: {
    marginBottom: theme.spacing(4),
    maxWidth: "100%",
    color: wellColors.elixir[900],
    [theme.breakpoints.up("sm")]: {
      marginBottom: "37px",
    },
  },
  card: {
    height: "100%",
  },
  cardTitle: {
    color: wellColors.elixir[900],
    fontWeight: 700,
  },
  cardType: {},
  cardContentItem: {
    color: wellColors.elixir[900],
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  cardContentItemValue: {
    color: wellColors.elixir[400],
  },
  cardContentValueHighlight: {
    color: wellColors.bloom[800],
  },
  noItems: {
    color: wellColors.elixir[900],
  },
  iconRoot: {
    color: wellColors.zen[600],
  },
}));

export interface AccountOverviewTabsProps {
  selectedTab: string;
  setSelectedTab: (arg0: string) => void;
  items: TOrders;
}

const AccountOverviewTabs: FC<AccountOverviewTabsProps> = ({
  selectedTab,
  setSelectedTab,
  items,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = useCallback(
    (item) => () => {
      history.push(`/account/${item.type}/${item.id}`);
    },
    [history]
  );

  const changeTab = (_: React.ChangeEvent<{}>, tabName: string) => {
    history.push(`/account/${tabName}`);
    setSelectedTab(tabName);
  };

  return (
    <div className={classes.tabsWrapper}>
      <Tabs
        classes={{
          indicator: classes.indicator,
          root: classes.tabsRoot,
        }}
        variant={"scrollable"}
        scrollButtons={"auto"}
        value={selectedTab}
        onChange={changeTab}
      >
        <Tab
          classes={{
            root: classes.tabRoot,
            wrapper: classes.tabWrapper,
          }}
          label={"Your Subscriptions"}
          value={"subscriptions"}
        />
        <Tab
          classes={{
            root: classes.tabRoot,
            wrapper: classes.tabWrapper,
          }}
          label={"Your orders"}
          value={"orders"}
        />
      </Tabs>
      <Grid container spacing={2}>
        {items.length > 0 &&
          items.map((item, itemIndex) => (
            <Grid item xs={12} sm={6} md={4} key={itemIndex}>
              <DetailsCard
                className={classes.card}
                icons={[
                  {
                    component:
                      item.type === "subscription"
                        ? AutorenewIcon
                        : ShoppingCartIcon,
                    classes: { root: classes.iconRoot },
                  },
                ]}
                buttons={[
                  {
                    color: "secondary",
                    children: "View Details",
                    onClick: handleCardClick(item),
                  },
                ]}
              >
                <>
                  <div>
                    <Spacing spacing={1} />
                    <Typography
                      className={classes.cardTitle}
                      variant={"h4"}
                      spacingAfter={0}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant={"subtitle1"}
                      color={"primary"}
                      spacingAfter={1}
                    >
                      {item.typeLabel}
                    </Typography>
                  </div>
                  {item.content.map(
                    (contentItem: any, contentItemIndex: number) => (
                      <div
                        key={contentItemIndex}
                        className={classes.cardContentItem}
                      >
                        <Typography color={"inherit"}>
                          {contentItem.label}
                        </Typography>
                        <Typography
                          className={clsx(classes.cardContentItemValue, {
                            [classes.cardContentValueHighlight]:
                              !!contentItem.valueHighlight,
                          })}
                        >
                          {contentItem.value}
                        </Typography>
                      </div>
                    )
                  )}
                </>
              </DetailsCard>
            </Grid>
          ))}
        {items.length === 0 && (
          <Grid item xs={12}>
            <Typography className={classes.noItems}>
              You have no {selectedTab} for the moment.
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AccountOverviewTabs;
