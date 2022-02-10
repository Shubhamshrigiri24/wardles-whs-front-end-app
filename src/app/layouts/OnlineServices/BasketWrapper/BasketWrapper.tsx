import React, { useState } from "react";
import {
  Container,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import Basket from "./Basket/Basket";
import SplitPanel from "../../../../components/SplitPanel/SplitPanel";
import {
  Product,
  Pack,
  OnlineService,
} from "../../../store/reducer/online/types";
import WellLogo from "./Well.svg";
import { useRouteMatch } from "react-router-dom";
import OnlineFooter from "../../../../components/OnlineFooter/OnlineFooter";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.breakpoints.down("sm") ? theme.spacing(1) : theme.spacing(6),
  },
  header: {
    display: "flex",
    marginLeft: theme.spacing(19),
    alignItems: "center",
    height: theme.spacing(14),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(8),
      justifyContent: "space-between",
      margin: theme.spacing(1.5, 2.5),
    },
    color: "#65727D",
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  headerConfirmation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: theme.spacing(19),
    height: theme.spacing(14),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(8),
      margin: theme.spacing(1.5, 2.5),
    },
    color: "#65727D",
    fontSize: "18px",
    lineHeight: "32.4px",
  },
  divider: {
    width: "100%",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  wellLogo: {
    maxHeight: "35px",
    maxWidth: "90px",
    objectFit: "contain",
    paddingBottom: theme.spacing(1),
  },
  textContainer: {
    marginLeft: theme.spacing(2),
  },
  overlay: {
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  floatingBasket: {
    backgroundColor: "white",
  },
  mobileBasketWrapper: {
    position: "absolute",
    width: "100%",
    zIndex: 100,
    height: "100vh",
  },
  showBasketButton: {
    color: "#0C161F",
    display: "flex",
    alignItems: "center",
  },
  basketCount: {
    marginLeft: theme.spacing(1),
  },
}));

export interface BasketWrapperStateProps {
  selectedOnlineService: OnlineService;
  product: Product;
  basketItem: Pack;
  children: Element[];
  hasFooter?: boolean;
}

const BasketWrapper: React.FC<BasketWrapperStateProps> = ({
  selectedOnlineService,
  product: getProduct,
  basketItem: getBasketItem,
  children,
  hasFooter,
}) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [showBasket, setShowBasket] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const showMobileBasket = isMobile && showBasket;
  const isOnlineConfirmationRoute = useRouteMatch({
    path: "/:onlineServiceId/checkout/confirmation",
    strict: true,
    sensitive: true,
  });

  const toggleBasket = () => {
    document.body.style.overflowY = showBasket ? "visible" : "hidden";
    setShowBasket(!showBasket);
  };

  // Once we have multiple items in a basket we can change this
  const basketItems = [getBasketItem];

  return isOnlineConfirmationRoute ? (
    <div>
      <div className={classes.headerConfirmation}>
        <div className={classes.logoContainer}>
          <img src={WellLogo} alt={"WellLogo"} className={classes.wellLogo} />
          <div className={classes.textContainer}>
            <Typography>Pharmacy Services</Typography>
          </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      {children}
    </div>
  ) : (
    <>
      <div className={classes.header}>
        <div className={classes.logoContainer}>
          <img src={WellLogo} alt={"WellLogo"} className={classes.wellLogo} />
          <div className={classes.textContainer}>
            <Typography>Pharmacy Services</Typography>
          </div>
        </div>
        {isMobile && (
          <div>
            <IconButton data-testid={"close"} onClick={toggleBasket}>
              {showBasket && <CloseIcon height={"21px"} />}
              {!showBasket && (
                <div className={classes.showBasketButton}>
                  <ShoppingCart height={"21px"} />
                  <Typography className={classes.basketCount}>
                    {basketItems.length}
                  </Typography>
                </div>
              )}
            </IconButton>
          </div>
        )}
      </div>
      <Divider className={classes.divider} />
      <div>
        {showMobileBasket && (
          <div className={classes.mobileBasketWrapper}>
            <div className={classes.floatingBasket}>
              <Basket
                product={getProduct}
                // TODO update to reflect a new reducer that shows multiple items in the basket.
                basketItems={basketItems}
                onlineService={selectedOnlineService}
              />
            </div>
            <div className={classes.overlay} onClick={toggleBasket} />
          </div>
        )}
        <SplitPanel
          main={
            <Container
              className={classes.container}
              maxWidth={"md"}
              disableGutters
            >
              {children}
            </Container>
          }
          secondary={
            <>
              {!isMobile && (
                <Basket
                  product={getProduct}
                  // TODO update to reflect a new reducer that shows multiple items in the basket.
                  basketItems={basketItems}
                  onlineService={selectedOnlineService}
                />
              )}
            </>
          }
        />
      </div>
      {hasFooter && <OnlineFooter />}
    </>
  );
};

export default BasketWrapper;
