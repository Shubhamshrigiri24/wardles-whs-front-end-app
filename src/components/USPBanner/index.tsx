import React from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Product } from "app/store/reducer/online/types";
import { Message } from "../../components";

function getUSP(product: Product) {
  switch (product.name.toLowerCase()) {
    case "hana":
      return {
        Icon: () => <LocalShippingIcon />,
        text: "Contraception delivered to your door without the hassle of waiting for an appointment.",
      };
    case "viagra connect":
    case "sildenafil":
    case "tadalafil":
    case "cialis":
      return {
        Icon: () => <LocalShippingIcon />,
        text: "This item has free delivery. It is delivered in discreet unbranded packaging.",
      };
    case "Medicated Weight Management Service":
    default:
      return {
        Icon: () => <FavoriteIcon />,
        text: "Includes ongoing support from our pharmacists.",
      };
  }
}

export interface DeliveryBannerProps {
  product: Product;
}

const USPBanner: React.FC<DeliveryBannerProps> = ({ product }) => {
  const usp = getUSP(product);
  return <Message message={usp.text} type={"info"} icon={usp.Icon} />;
};

export default USPBanner;
