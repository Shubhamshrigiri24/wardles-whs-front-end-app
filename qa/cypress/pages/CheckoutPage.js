import {DeliveryDetailsPage} from "./DeliveryDetailsPage";
import {Page} from './Page';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class CheckoutPage extends Page {
  constructor(ignoreHttpCode) {
    super(httpRoutes.ed.CheckoutPath, ignoreHttpCode);
  }

  // LOCATORS
  titleDropdowLocator = '#mui-component-select-title';
  titleDropdownListElementLocator = 'ul[role="listbox"] li';
  firstNameFieldLocator = 'input[data-testid="YourDetailsForm/firstName"]';
  lastNameFieldLocator = 'input[data-testid="YourDetailsForm/lastName"]';
  emailFieldLocator = 'input[data-testid="YourDetailsForm/email"]';
  phoneNumberFieldLocator = 'input[data-testid="YourDetailsForm/phone"]';
  postcodeFieldLocator = 'input[data-testid="postcode"]';
  addressOneFieldLocator = 'input[data-testid="YourDetailsForm/line1"]';
  addressTwoFieldLocator = 'input[data-testid="YourDetailsForm/line2"]';
  cityFieldLocator = 'input[data-testid="YourDetailsForm/city"]';
  optionalHealthAdviceCheckboxLocator = 'input[data-testid="YourDetailsForm/checkbox"]';
  nextButtonLocator = 'button[data-testid="YourDetailsForm/next-button"]';
  searchButtonLocator = 'button[data-testid="addressLookUp/search-button"]';

  // ELEMENTS
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
  getEmailField() {
    return cy.get(this.emailFieldLocator);
  }
  getPhoneNumberField() {
    return cy.get(this.phoneNumberFieldLocator);
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
  getOptionalCheckbox() {
    return cy.get(this.optionalHealthAdviceCheckboxLocator);
  }
  getNextButton() {
    return cy.get(this.nextButtonLocator);
  }
  getSearchButton() {
    return cy.get(this.searchButtonLocator);
  }

  // ACTIONS
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
  fill_in_email(email) {
    this.getEmailField().should('be.visible').type(email);
    return this;
  }
  fill_in_phonenumber(phonenumber) {
    // console.log('Filling in honenumber with value '+phonenumber)
    this.getPhoneNumberField().should('be.visible').type(phonenumber);
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
  select_health_advice_option(option) {
    if (option)
      this.getOptionalCheckbox().click();
    return this;
  }
  click_next_button() {
    this.getNextButton().should('be.visible').click();
    return new DeliveryDetailsPage;
  }
  fill_in_customer_details(customer) {
    
    this.select_title(customer.title);
    this.fill_in_first_name(customer.firstName);
    this.fill_in_last_name(customer.lastName);
    this.fill_in_email(customer.email);
    this.fill_in_phonenumber(customer.phone);
    this.fill_in_postcode(customer.postcode);

    this.click_search_button();

    this.fill_in_address(1, customer.addressLine1);
    this.fill_in_address(2, customer.addressLine2);
    this.fill_in_city(customer.city);

    this.select_health_advice_option(customer.option);

    let nextPage = this.click_next_button();
    return nextPage;
  }
}

export {CheckoutPage};
