/// <reference types="Cypress" />

import {Page} from './Page';
import {CheckoutPage} from './CheckoutPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class ProductSelectionAndOverviewPage extends Page {
  constructor(ignoreHttpCode) {
    super(httpRoutes.ed.SelectionPath, ignoreHttpCode);
  }

  // LOCATORS
  productNameElementLocator = 'div[data-testid*="side-tabs/sideBar/"] p[data-testid="product-select-header/variant/product-name"]'; // returns list of all products on the page. odd numbers are the web products, even numbers are the mobile products
  overviewTabButtonLocator = 'div[data-testid="buttonsRows"] button span';
  strengthButtonLocator = 'button[data-testid="PROD_STR_VAL"]';
  packSizeButtonLocator = 'div[data-testid="buttonsRows"] button[data-testid="PK_SIZE_VAL"]';
  priceElementLocator = 'p[data-testid="price"]';
  continueToCheckoutButtonLocator = 'button[data-testid="submitButton"]';

  // ELEMENTS
  getContinueToCheckoutButton() {
    return cy.get(this.continueToCheckoutButtonLocator).last()
    .should('be.visible');
  }

  getStrengthButton(product_strength) {
    return cy.get(
      this.strengthButtonLocator.replace("PROD_STR_VAL", product_strength)).last()
      .should('be.visible');
  }

  getPackSizeButton(pack_size) {
    return cy.get(
      this.packSizeButtonLocator.replace("PK_SIZE_VAL", pack_size)).last()
      .should('be.visible');
  }

  getProductButton(label) {
    return cy
      .get(this.productNameElementLocator)
      .should('be.visible')
      .contains(label);
  }

  // ACTIONS
  select_product_from_side_bar(product_name) {
    this.getProductButton(product_name).click().parents().should('have.class', 'isSelected');
    return this;
  }

  select_product_strength(product_strength) {
    this.getStrengthButton(product_strength).click();
    return this;
  }

  select_product_pack_size(pack_size) {
    this.getPackSizeButton(pack_size).click();
    return this;
  }

  click_continue_to_checkout_button() {
    this.getContinueToCheckoutButton()
    .should('be.visible')
    .then(($btn) => {
      cy.wrap($btn).click()
    })
    return new CheckoutPage;
  }

  check_product_price_is(product_price) {
    cy.get(this.priceElementLocator).last().should('have.text', product_price);
    return this;
  }

  complete_product_and_pack_selection(product_name, product_strength, pack_size, product_price) {
    this.select_product_from_side_bar(product_name);
    this.select_product_strength(product_strength);
    this.select_product_pack_size(pack_size);
    this.check_product_price_is(product_price);
    let nextPage = this.click_continue_to_checkout_button();
    return nextPage;
  }
}

export {ProductSelectionAndOverviewPage};
