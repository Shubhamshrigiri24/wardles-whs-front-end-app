import React, { FC, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useIntercom } from "react-use-intercom";
import { Container, Box } from "@material-ui/core";
import {
  LOGIN_OPTIONS_PATH,
  PRODUCT_SELECT_PATH,
  ACCOUNT_DETAILS_PATH,
  REGISTER_PATH_PATH,
  ORDER_PAYMENT_PATH,
  ACCOUNT_ORDERS_PATH,
  ORDER_DETAILS_PATH,
  TERMS_AND_CONDITIONS_PATH,
} from "constants/paths";
import OnlineServicesConsultation from "pages/OnlineServicesConsultationPage";
import OnlineServicesPageWrapper from "app/layouts/OnlineServices/PageWrapper";
import OnlineServicesBasketWrapper from "app/layouts/OnlineServices/BasketWrapper";
import DeliveryDetailsPage from "pages/OnlineServicesDeliveryDetailsPage";
import ProductSelectionPage from "../../pages/ProductSelectionPage";
import OnlineServicesYourDetails from "pages/OnlineServicesYourDetailsPage";
import OrderConfirmationPage from "pages/OrderConfirmationPage";
import OnlinePaymentPage from "pages/OnlinePaymentPage";
import OnlinePageNotFound from "pages/OnlinePageNotFound/OnlinePageNotFound";
import OnlineServicesOrderDetailsPage from "pages/OnlineServicesOrderDetailsPage";
import { LoginOptionsPage } from "pages/LoginOptionsPage";
import PrivateRoute from "@welldigital/ui-common/Components/PrivateRoute";
import OnlineServicesAccountOverviewPage from "pages/OnlineServicesAccountOverviewPage";
import OnlineServicesStart from "../../pages/OnlineServicesStartPage";
import ProtectedOnlineOrderRoute from "app/routes/ProtectedOnlineOrderRoute";
import { RequiredSteps } from "app/routes/ProtectedOnlineOrderRoute/ProtectedOnlineOrderRoute";
import OnlineServicesCheckoutConfirmationPage from "pages/OnlineServicesCheckoutConfirmationPage";
import OnlineServicesCheckoutPaymentPage from "pages/OnlineServicesCheckoutPaymentPage";
import { OrderShippingDetails } from "pages/OrderShippingDetails/OrderShippingDetails";
import GeneralLayout from "app/layouts/OnlineServices/GeneralLayout/GeneralLayout";
import { OnlineServicesTermsAndConditionsPage } from "pages/OnlineServicesTermsAndConditionsPage";
import OrderProductSelectionPage from "pages/OrderProductSelectionPage";

export const OnlineRoutes: FC = () => {
  const location = useLocation();
  const { update } = useIntercom();

  useEffect(() => {
    update();
  }, [location, update]);

  return (
    <Switch>
      <Route path={TERMS_AND_CONDITIONS_PATH}>
        <OnlineServicesTermsAndConditionsPage />
      </Route>
      <Route exact path={"/online/:onlineServiceId(hana)/consultation"}>
        <OnlineServicesPageWrapper>
          <OnlineServicesConsultation />
        </OnlineServicesPageWrapper>
      </Route>
      <Route exact path={"/online/:onlineServiceId(hana)/product"}>
        <OnlineServicesPageWrapper>
          <ProductSelectionPage />
        </OnlineServicesPageWrapper>
      </Route>
      <Route exact path={"/online/:onlineServiceId/invalid"}>
        <OnlineServicesPageWrapper>
          <p>Invalid answers page here</p>
        </OnlineServicesPageWrapper>
      </Route>
      <Route path={"/online/:onlineServiceId(hana)/checkout"}>
        <Switch>
          <Route path={"/online/:onlineServiceId(hana)/checkout/your-details"}>
            <OnlineServicesBasketWrapper hasFooter>
              <OnlineServicesYourDetails />
            </OnlineServicesBasketWrapper>
          </Route>
          <Route
            path={"/online/:onlineServiceId(hana)/checkout/delivery-details"}
          >
            <OnlineServicesBasketWrapper hasFooter>
              <DeliveryDetailsPage />
            </OnlineServicesBasketWrapper>
          </Route>
          <Route path={"/online/:onlineServiceId(hana)/checkout/payment"}>
            <OnlineServicesBasketWrapper hasFooter>
              <OnlinePaymentPage />
            </OnlineServicesBasketWrapper>
          </Route>
          <Route path={"/online/:onlineServiceId(hana)/checkout/confirmation"}>
            <OrderConfirmationPage />
          </Route>
        </Switch>
      </Route>
      <Route exact path={"/order/:onlineServiceId(ed)/start"}>
        <OnlineServicesStart />
      </Route>
      <Route exact path={"/order/:onlineServiceId(ed)/consultation"}>
        {/* This is going to be refactored when we move hana under same layout, otherwise we need to make a new Compoonent like "EdOnlineServicesConsultation" which will wrap OnlineServicesConsultation with ED flow layout */}
        <GeneralLayout>
          <Container maxWidth={"lg"}>
            <Box py={6} px={2} minHeight={"90vh"}>
              <OnlineServicesConsultation />
            </Box>
          </Container>
        </GeneralLayout>
      </Route>
      <Route exact path={PRODUCT_SELECT_PATH}>
        <ProtectedOnlineOrderRoute
          requiredStepsIds={[RequiredSteps.CONSULTATION]}
          basename={"order"}
        >
          <OrderProductSelectionPage />
        </ProtectedOnlineOrderRoute>
      </Route>
      <Route path={LOGIN_OPTIONS_PATH}>
        <LoginOptionsPage />
      </Route>
      <Route path={REGISTER_PATH_PATH}>
        <OrderShippingDetails />
      </Route>
      <Route path={ACCOUNT_DETAILS_PATH}>
        <ProtectedOnlineOrderRoute
          requiredStepsIds={[
            RequiredSteps.CONSULTATION,
            RequiredSteps.PRODUCT_SELECTION,
          ]}
          basename={"order"}
        >
          <OrderShippingDetails hasBasket />
        </ProtectedOnlineOrderRoute>
      </Route>
      <Route path={ORDER_PAYMENT_PATH}>
        <ProtectedOnlineOrderRoute
          requiredStepsIds={[
            RequiredSteps.CONSULTATION,
            RequiredSteps.PRODUCT_SELECTION,
            RequiredSteps.CUSTOMER_DETAILS,
          ]}
          basename={"order"}
        >
          <OnlineServicesCheckoutPaymentPage />
        </ProtectedOnlineOrderRoute>
      </Route>
      <Route path={"/order/:onlineServiceId(ed)/confirmation"}>
        <OnlineServicesCheckoutConfirmationPage />
      </Route>
      <PrivateRoute
        path={ORDER_DETAILS_PATH}
        shouldTriggerAuthentication
        component={OnlineServicesOrderDetailsPage}
      />
      <PrivateRoute
        path={ACCOUNT_ORDERS_PATH}
        shouldTriggerAuthentication
        component={OnlineServicesAccountOverviewPage}
      />
      <Redirect
        exact
        from={"/online/ed/product-selection"}
        to={"/order/ed/product-selection"}
      />
      <Redirect exact from={"/ed/start"} to={"/order/ed/start"} />
      <Redirect exact from={"/online/ed/start"} to={"/order/ed/start"} />

      {/* used so far for actual/particular issues: /hana/consultation, /hana/product */}
      <Redirect exact from={"/hana/*"} to={"/online/hana/*"} />
      <Redirect exact from={"/order/payment"} to={"/order/ed/payment"} />
      <Redirect
        exact
        from={"/hana/consultation"}
        to={"/online/hana/consultation"}
      />
      <Redirect exact from={"/order/account-details"} to={"/register"} />
      <Route>
        <OnlinePageNotFound />
      </Route>
    </Switch>
  );
};

export default OnlineRoutes;
