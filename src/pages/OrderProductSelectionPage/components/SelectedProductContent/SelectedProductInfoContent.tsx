import React from "react";
import { Typography } from "@welldigital/components";
import ExternalLink from "../ProductModal/externalLink.svg";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { useStyles } from "pages/OrderProductSelectionPage/components/ProductModal/styles";

const EXTERNAL_LINKS = {
  sildenafil:
    "https://www.well.co.uk/pharmacy-services/erectile-dysfunction/sildenafil",
  viagra:
    "https://www.well.co.uk/pharmacy-services/erectile-dysfunction/viagra-connect",
  tadalafil:
    "https://www.well.co.uk/pharmacy-services/erectile-dysfunction/tadalafil",
  cialis:
    "https://www.well.co.uk/pharmacy-services/erectile-dysfunction/cialis",
};

export type SelectedProductInfoContentProps = {
  product: PriceConfig;
};

export const SelectedProductInfoContent: React.FC<SelectedProductInfoContentProps> =
  ({ product }) => {
    const classes = useStyles();
    const productMeta = product.__meta__;
    return (
      <>
        <Typography className={classes.description} spacingAfter={4}>
          {productMeta?.description}
        </Typography>
        {productMeta?.moreInfo.map(({ title, content }) => (
          <React.Fragment key={title}>
            <Typography className={classes.moreInfoTitle}>{title}</Typography>
            <Typography className={classes.moreInfoText} spacingAfter={4}>
              {content}
            </Typography>
          </React.Fragment>
        ))}
        <div>
          <a
            href={
              productMeta
                ? EXTERNAL_LINKS[productMeta.id as keyof typeof EXTERNAL_LINKS]
                : undefined
            }
            className={classes.externalLink}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            <span className={classes.externalLinkText}>
              Read more about {`${productMeta?.productName}`}
            </span>
            <img
              src={ExternalLink}
              alt={"External link"}
              className={classes.externalLinkIcon}
            />
          </a>
        </div>
      </>
    );
  };
