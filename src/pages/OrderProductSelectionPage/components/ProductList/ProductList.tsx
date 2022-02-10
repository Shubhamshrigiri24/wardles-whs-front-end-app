import React, { useCallback, useState, useMemo } from "react";
import classNames from "clsx";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { ProductListItem } from "../ProductListItem";
import { sortOptions, SortAllowance, sortProducts } from "./sorting";
import { useStyles } from "./styles";

export type ProductListProps = {
  products: PriceConfig[];
  selectedProduct: PriceConfig | null;
  onSeeMoreInfoMobile: (product: PriceConfig | null) => void;
  onSelectMobile: (product: PriceConfig | null) => void;
  onSelectLargeScreen: (product: PriceConfig | null) => void;
};

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProduct,
  onSeeMoreInfoMobile,
  onSelectMobile,
  onSelectLargeScreen,
}) => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState(SortAllowance.BestValue);
  const setSorting = useCallback((evt) => setSortBy(evt.target.value), []);

  const sortedProducts = useMemo(
    () => [...products].sort(sortProducts(sortBy)),
    [sortBy, products]
  );

  return (
    <div className={classNames(classes.productListContainer)}>
      <div className={classNames(classes.productListSortContainer)}>
        <div className={classNames(classes.productListSortContainerTitle)}>
          Sort treatments by
        </div>
        <div>
          <FormControl
            className={classes.formControl}
            data-testid={"product-list/sort-form"}
          >
            <Select
              labelId={"demo-simple-select-label"}
              id={"demo-simple-select"}
              value={sortBy}
              style={{ backgroundColor: "white", padding: "0 0 0 10px" }}
              onChange={setSorting}
              data-testid={"product-list/sort-form/select"}
            >
              {sortOptions.map(({ value, label }) => (
                <MenuItem
                  key={value}
                  value={value}
                  classes={{ root: classes.selectOption }}
                  data-testid={`product-list/sort-form/select-option-${value}`}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        className={classNames(classes.productList)}
        data-testid={"product-list/wrapper"}
      >
        {sortedProducts.map((product) => (
          <ProductListItem
            product={product}
            key={product.__meta__.id}
            isSelected={selectedProduct === product}
            onSeeMoreInfoMobile={onSeeMoreInfoMobile}
            onSelectMobile={onSelectMobile}
            onSelectLargeScreen={onSelectLargeScreen}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
