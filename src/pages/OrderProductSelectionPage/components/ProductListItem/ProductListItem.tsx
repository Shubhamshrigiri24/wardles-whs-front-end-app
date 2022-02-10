/* eslint-disable react/jsx-no-bind */
import React from "react";
import classNames from "clsx";
import { BestValueIcon } from "@welldigital/components/icons";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { extractDataFromPriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/helpers";
import { useStyles } from "./styles";

export type ProductListItemProps = {
  product: PriceConfig;
  onSeeMoreInfoMobile: (product: PriceConfig) => void;
  onSelectMobile: (product: PriceConfig) => void;
  onSelectLargeScreen: (product: PriceConfig) => void;
  isSelected: boolean;
};

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onSeeMoreInfoMobile,
  onSelectMobile,
  onSelectLargeScreen,
  isSelected,
}) => {
  const {
    __meta__: {
      id,
      productName,
      activeIngredient,
      duration,
      isBestValue,
      worksIn,
      imageURI,
    },
  } = product;
  const extraInfo = extractDataFromPriceConfig(product);
  // sort prices by price ASC in order to find minimum product price
  extraInfo[id].priceObjects.sort((a, b) => +a.price - +b.price);
  const minPriceObj = extraInfo[id].priceObjects[0];
  const levels = product.__meta__.levels;
  const strengthsLevelName = levels[0].levelLabel;
  const startingPrice = minPriceObj.price.toFixed(2);
  const startingPricePerUnit = minPriceObj.pricePerUnit.toFixed(2);
  const strengths = extraInfo[id][strengthsLevelName];
  const pricePerUnitLabel = `£${startingPricePerUnit} per tablet`;
  const strengthLabel = strengths.map((s) => `${s}mg`).join(", ");

  const contentLines = {
    "Works in": worksIn,
    "Active for": duration,
    Contains: activeIngredient,
    Strength: strengthLabel,
  };

  const classes = useStyles();

  return (
    <div
      className={classNames(classes.productListItem)}
      data-testid={`product-list/list-item product-list/list-item-${productName}`}
    >
      <div
        className={classNames(classes.productHeader)}
        data-testid={"product-list/list-item-header"}
      >
        <img
          className={classNames(classes.productImage)}
          src={imageURI}
          alt={productName}
          data-testid={"product-list/list-item-image"}
        />
        <div
          className={classNames(classes.productNameAndAccolade)}
          data-testid={"product-list/list-item-name-wrapper"}
        >
          <div
            className={classNames(classes.productName)}
            data-testid={"product-list/list-item-name"}
          >
            {productName}
          </div>
          <div
            className={classNames(classes.productAccolade)}
            data-testid={"product-list/list-item-accolade"}
          >
            {isBestValue && (
              <BestValueIcon
                className={classNames(classes.bestValueIcon)}
                style={{ fontSize: 20 }}
              />
            )}
            <span style={{ lineHeight: "20px" }}>&nbsp;</span>
            {isBestValue ? "Our best value treatment" : ""}
          </div>
        </div>
      </div>
      <div
        className={classNames(classes.productLinesWrapper)}
        data-testid={"product-list/list-item-info"}
      >
        <div
          className={classNames(classes.productLinesHead)}
          data-testid={"product-list/list-item-info-head"}
        >
          <div className={"from"}>
            From: <span className={"starting-price"}>£{startingPrice}</span>
          </div>
          <div className={"per-unit"}>{pricePerUnitLabel}</div>
        </div>
        <div
          className={classNames(classes.productLines)}
          data-testid={"product-list/list-item-info-rows"}
        >
          {[...Object.entries(contentLines)].map(([label, value]) => (
            <div
              className={classNames(classes.productLine)}
              key={label}
              data-testid={"product-list/list-item-info-row"}
            >
              <span
                className={"label"}
                data-testid={"product-list/list-item-info-row/label"}
              >
                {label}:
              </span>
              <span
                className={"value"}
                data-testid={"product-list/list-item-info-row/value"}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames(classes.buttonsWrapper)}
        data-testid={"product-list/list-item-buttons/wrapper"}
      >
        <button
          className={classNames(
            classes.button,
            classes.buttonMobile,
            classes.buttonMoreInfo
          )}
          onClick={() => onSeeMoreInfoMobile(product)}
          data-testid={"product-list/list-item-buttons/see-more"}
        >
          See more
        </button>
        <button
          className={classNames(
            classes.button,
            classes.buttonMobile,
            classes.buttonSelect
          )}
          onClick={() => onSelectMobile(product)}
          data-testid={"product-list/list-item-buttons/select"}
        >
          Select
        </button>
        <a
          href={"#large-screen-selected-product-content"}
          className={classNames(
            classes.button,
            classes.buttonSelectLargeScreen,
            isSelected && classes.buttonSelected
          )}
          onClick={() => onSelectLargeScreen(product)}
        >
          {isSelected ? "Selected" : "Select"}
        </a>
      </div>
    </div>
  );
};

export default ProductListItem;
