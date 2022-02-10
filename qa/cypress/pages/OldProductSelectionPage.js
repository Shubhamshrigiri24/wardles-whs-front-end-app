import {Page} from './Page';
import {CheckoutPage} from './CheckoutPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class OldProductSelectionPage extends Page {
  constructor(ignoreHttpCode) {
    super(httpRoutes.ed.SelectionPath, ignoreHttpCode);
  }

  // LOCATORS
  nextButtonLocator = '[data-testid="next-button"]';
  radioButtonInputLocator = 'input[type="radio"]';
  continueToCheckoutButtonLocator = '[data-testid="ProductSelectionPage/continue-button"]';
  packSizeButtonLocator = 'div[data-testid="buttonsRows"] button[data-testid="PK_SIZE_VAL"]';
  periodButtonLocator = 'div.MuiPaper-root.MuiPaper-rounded span.MuiTypography-root';

  // ELEMENTS
  getNextButton() {
    return cy.get(this.nextButtonLocator);
  }
  getContinueToCheckoutButton() {
    return cy.get(this.continueToCheckoutButtonLocator);
  }

  getRadioButtonOption() {
    return cy.get(this.radioButtonInputLocator);
  }

  // ACTIONS
  click_first_option() {
    return this.getRadioButtonOption()
    .first()
    .then(($btn) => {
      cy.wrap($btn).click();
    })
  }

  click_last_option() {
    return this.getRadioButtonOption()
    .last()
    .then(($btn) => {
      cy.wrap($btn).click();
    })
  }

  click_radio_button_with_label(label) {
    return cy.contains('span', label).siblings()
    .find(this.radioButtonInputLocator)
    // .should('be.visible') // fails due to element opacity being 0
    .click();
  }

  check_continue_to_checkout_button_is_disabled() {
    return cy.get(this.continueToCheckoutButtonLocator)
    .should('have.attr', 'disabled');
  }

  check_continue_to_checkout_button_is_enabled() {
    return cy.get(this.continueToCheckoutButtonLocator)
    .should('not.have.attr', 'disabled');
  }

  click_next_button() {
    this.getNextButton()
    .should('be.visible')
    .then(($btn) => {
      cy.wrap($btn).click()
    })
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

  getPerionButton(pack_size) {
    return cy.get(this.periodButtonLocator)
    .contains(pack_size)
    .should('be.visible');
  }

  select_product_pack_size(pack_size) {
    this.getPerionButton(pack_size).click();
    return this;
  }

  complete_product_and_pack_selection(pack_size, product_price) {
    this.select_product_pack_size(pack_size)
    this.check_continue_to_checkout_button_is_enabled();
    let nextPage = this.click_continue_to_checkout_button();
    return nextPage;
  }
}

export {OldProductSelectionPage};