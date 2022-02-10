import {Page} from './Page';
import {PaymentPage} from './PaymentPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class DeliveryDetailsPage extends Page {
  constructor(ignoreHttpCode) {
    console.log(ignoreHttpCode);
    super(httpRoutes.ed.DeliveryPath, ignoreHttpCode);
  }

  // LOCATORS
  sameDetailsButtonLocator = 'input[data-testid="DeliveryDetailsForm/checkbox"]';
  // titleDropdowLocator = 'input[data-testid="DeliveryDetailsForm/title-select"]';
  titleDropdowLocator = 'div[id="mui-component-select-title"]';
  titleDropdownListElementLocator = 'li[role="option"]';
  firstNameFieldLocator = 'input[data-testid="DeliveryDetailsForm/firstName"]';
  lastNameFieldLocator = 'input[data-testid="lastName"]';
  postcodeFieldLocator = 'input[data-testid="postcode"]';
  addressOneFieldLocator = 'input[data-testid="line1"]';
  addressTwoFieldLocator = 'input[data-testid="line2"]';
  cityFieldLocator = 'input[data-testid="DeliveryDetailsForm/city"]';
  nextButtonLocator = 'button[data-testid="DeliveryDetailsForm/next-button"]';
  searchButtonLocator = 'button[data-testid="addressLookUp/search-button"]';

  // ELEMENTS
  getSameDetailsCheckbox() {
    return cy.get(this.sameDetailsButtonLocator);
  }
  getTitleDropdow = () => {
    return cy.get(this.titleDropdowLocator);
  }
  getTitleDropdownList() {
    return cy.get(this.titleDropdownListElementLocator);
  }
  getFirstNameField() {
    return cy.get(this.firstNameFieldLocator);
  }
  getLastNameField() {
    return cy.get(this.lastNameFieldLocator);
  }
  getPostcodeField() {
    return cy.get(this.postcodeFieldLocator);
  }
  getAddressOneField() {
    return cy.get(this.addressOneFieldLocator);
  }
  getAddressTwoField() {
    return cy.get(this.addressTwoFieldLocator);
  }
  getCityField() {
    return cy.get(this.cityFieldLocator);
  }
  getNextButton() {
    return cy.get(this.nextButtonLocator);
  }
  getSearchButton() {
    return cy.get(this.searchButtonLocator);
  }

  // ACTIONS
  use_same_details() {
    // let currentStatus = this.getSameDetailsCheckbox().parents('span[class*="MuiCheckbox"]');
    // if (!currentStatus.contains('Mui-checked')) {
    //   this.getSameDetailsCheckbox().click();
    // }
    // return this;
    return this.getSameDetailsCheckbox().click();
  }
  select_title(title) {
    this.getTitleDropdow().should('be.visible').click();
    this.getTitleDropdownList().contains(title).click();
    return this;
  }
  fill_in_first_name(first_name) {
    this.getFirstNameField().should('be.visible').type(first_name);
    return this;
  }
  fill_in_last_name(last_name) {
    this.getLastNameField().should('be.visible').type(last_name);
    return this;
  }
  fill_in_postcode(postcode) {
    this.getPostcodeField().should('be.visible').type(postcode);
    return this;
  }
  click_search_button() {
    this.getSearchButton().should('be.visible').click();
    return this;
  }
  fill_in_address(field, value) {
    if (field === 1)
      this.getAddressOneField().should('be.visible').type(value);
    else if (field === 2)
      this.getAddressTwoField().should('be.visible').type(value);
    return this;
  }
  fill_in_city(city) {
    this.getCityField().should('be.visible').type(city);
    return this;
  }
  click_next_button() {
    this.getNextButton().should('be.visible').click();
    return new PaymentPage;
  }
  fill_in_delivery_address_for_customer(customer) {

    this.select_title(customer.title);
    this.fill_in_first_name(customer.firstName);
    this.fill_in_last_name(customer.lastName);
    this.fill_in_postcode(customer.postcode);

    this.click_search_button();

    this.fill_in_address(1, customer.addressLine1);
    this.fill_in_address(2, customer.addressLine2);
    this.fill_in_city(customer.city);

    let nextPage = this.click_next_button();

    return nextPage;
  }
}

export {DeliveryDetailsPage};
