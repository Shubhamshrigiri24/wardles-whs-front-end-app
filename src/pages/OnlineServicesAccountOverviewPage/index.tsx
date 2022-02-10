/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Container, makeStyles, Theme } from "@material-ui/core";
import { Loader } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { ACTION_STATUSES } from "app/store/types";
import { getSubscriptions } from "../../app/store/reducer/subscriptions/actions";
import {
  getSubscriptionsStatus,
  getSubscriptionsData,
} from "../../app/store/reducer/subscriptions/selectors";
import { getOrders } from "app/store/reducer/orders/actions";
import {
  getOrdersData,
  getOrdersStatus,
} from "app/store/reducer/orders/selectors";
import { getAccount } from "app/store/reducer/account/actions";
import {
  getAccountData,
  getAccountStatus,
} from "app/store/reducer/account/selectors";
import { Alert, Spacing } from "@welldigital/components";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import AccountOverviewBanner from "./components/AccountOverviewBanner";
import AccountOverviewSideCard from "./components/AccountOverviewSideCard";
import AccountOverviewTabs from "./components/AccountOverviewTabs";
import { useParams } from "react-router-dom";
import { useAuthentication } from "@welldigital/ui-common/Authentication";
import { ONLINE_SERVICES } from "../../constants/account";
import { eventsBuilder } from "utils/events";
import { analytics } from "@welldigital/ui-common";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: "76px",
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  contentLoader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(6),
  },
  contentLeft: {
    flex: "1 1 100%",
    order: 1,
    overflow: "hidden",
    paddingTop: "24px",
    [theme.breakpoints.up("sm")]: {
      order: 0,
      paddingTop: "60px",
    },
  },
  contentRight: {
    width: "100%",
    paddingTop: "24px",
    order: 0,
    [theme.breakpoints.up("sm")]: {
      flexBasis: "270px",
      flexShrink: 0,
      order: 1,
      paddingTop: "145px",
      marginLeft: theme.spacing(5),
    },
  },
}));

const OnlineServicesAccountOverview: FC<{}> = () => {
  const classes = useStyles();
  const params = useParams<{ orderType: string }>();
  const { availableLinks } = useAuthentication();

  const initialTab = params?.orderType;
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const subscriptionsStatus = useSelector(getSubscriptionsStatus);
  const subscriptionsData = useSelector(getSubscriptionsData);
  const dispatch = useDispatch();

  const ordersData = useSelector(getOrdersData);
  const ordersStatus = useSelector(getOrdersStatus);

  const accountData = useSelector(getAccountData);
  const accountStatus = useSelector(getAccountStatus);

  const hasOnlineServiceAccount = !!availableLinks.find(
    (link) => link.id === ONLINE_SERVICES
  );

  const isLoading =
    subscriptionsStatus === ACTION_STATUSES.PENDING ||
    accountStatus === ACTION_STATUSES.PENDING ||
    ordersStatus === ACTION_STATUSES.PENDING;
  const isError =
    subscriptionsStatus === ACTION_STATUSES.FAILED ||
    accountStatus === ACTION_STATUSES.FAILED ||
    ordersStatus === ACTION_STATUSES.FAILED;
  const isSuccess =
    subscriptionsStatus === ACTION_STATUSES.LOADED &&
    accountStatus === ACTION_STATUSES.LOADED &&
    ordersStatus === ACTION_STATUSES.LOADED;

  const items = selectedTab === "orders" ? ordersData : subscriptionsData;

  const fetchData = useCallback(() => {
    if (!hasOnlineServiceAccount) return;
    dispatch(getSubscriptions());
    dispatch(getOrders());
    dispatch(getAccount());
  }, [dispatch, getSubscriptions, getAccount, hasOnlineServiceAccount]);

  useLayoutEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    fetchData();
  }, []);

  const hasReferral = document.referrer && document.referrer !== "";
  const refferal = hasReferral ? document.referrer : "UNAVAILABLE";

  useEffect(() => {
    analytics.trackEvent({
      flow: "account",
      event: eventsBuilder.account.dashboard,
      metadata: { refferal },
    });
  }, []);

  if (!hasOnlineServiceAccount) {
    return (
      <GeneralLayout>
        <Container maxWidth={"lg"}>
          <Spacing spacing={6} />
          <Alert
            message={"You dont have an online profile yet."}
            type={"info"}
            spacingAfter={6}
          />
        </Container>
      </GeneralLayout>
    );
  }

  return (
    <GeneralLayout>
      <AccountOverviewBanner orderType={selectedTab} />
      <Container maxWidth={"lg"}>
        {isError && (
          <>
            <Spacing spacing={4} />
            <Alert
              message={"Error when fetching data"}
              type={"error"}
              spacingAfter={6}
              onClose={fetchData}
              closeLabel={"Retry"}
            />
          </>
        )}
        {isLoading && (
          <div className={classes.content}>
            <div className={classes.contentLoader}>
              <Loader />
            </div>
          </div>
        )}
        {isSuccess && (
          <div className={classes.content}>
            <div className={classes.contentLeft}>
              <AccountOverviewTabs
                items={items}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </div>
            <div className={classes.contentRight}>
              <AccountOverviewSideCard data={accountData} />
            </div>
          </div>
        )}
      </Container>
    </GeneralLayout>
  );
};

export default OnlineServicesAccountOverview;
