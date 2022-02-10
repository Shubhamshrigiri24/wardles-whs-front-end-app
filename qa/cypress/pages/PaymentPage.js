import {Page} from './Page';
import {OrderReviewPage} from './OrderReviewPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class PaymentPage extends Page {
  constructor(ignoreHttpCode) {
    super(httpRoutes.ed.PaymentPath, ignoreHttpCode);
  }

  // LOCATORS
  cardNumberLocator = 'input[id="credit-card-number"]';
  cardExpirationDateLocator = 'input[id="expiration"]';
  cardCvvLocator = 'input[id="cvv"]';
  payButtonLocator = 'button[data-testid="paymentPanel/payment-button"]';
  otpFieldLocator = 'input[name="challengeDataEntry"]';
  otpSubmitButtonLocator = 'input[type="submit"][value="SUBMIT"]';

  ccNumberIframeLocator = 'iframe[name="braintree-hosted-field-number"]';
  ccExpirationDateIframeLocator = 'iframe[name="braintree-hosted-field-expirationDate"]';
  ccCVVIframeLocator = 'iframe[name="braintree-hosted-field-cvv"]';

  ccOTPIframeLocator = 'iframe[id="Cardinal-CCA-IFrame"]';

  // ELEMENTS
  getCardNumberField() {
    return cy.get(this.cardNumberLocator);
  }
  getExpirationDateField() {
    return cy.get(this.cardExpirationDateLocator);
  }
  getCvvField() {
    return cy.get(this.cardCvvLocator);
  }
  getPayButton() {
    return cy.get(this.payButtonLocator);
  }
  // ACTIONS
  fill_in_card_number(ccNo) {
    this.fill_in_field_inside_iframe(this.ccNumberIframeLocator, this.cardNumberLocator, ccNo);
    return this;
  }
  fill_in_expiration_date(expDate) {
    this.fill_in_field_inside_iframe(this.ccExpirationDateIframeLocator, this.cardExpirationDateLocator, expDate);
    return this;
  }
  fill_in_cvv(cvvNo) {
    this.fill_in_field_inside_iframe(this.ccCVVIframeLocator, this.cardCvvLocator, cvvNo);
    return this;
  }
  fill_in_opt(otpCode) {
    this.fill_in_field_inside_iframe(this.ccOTPIframeLocator, this.otpFieldLocator, otpCode);
    return this;
  }
  click_submit() {
    this.click_button_inside_iframe(this.ccOTPIframeLocator, this.otpSubmitButtonLocator, 'SUBMIT');
    return this;
  }
  click_pay_button() {
    this.getPayButton().should('be.visible').click();
    return this;
  }
  fill_in_payment_info(credit_card) {
    cy.wait(5000);

    this.fill_in_card_number(credit_card.card_number);
    this.fill_in_expiration_date(credit_card.expiration_date);
    this.fill_in_cvv(credit_card.cvv);

    this.click_pay_button();
    cy.wait(5000);

    this.fill_in_opt(credit_card.otp);
    this.click_submit();

    cy.get('[data-braintree-id="loading-indicator"]').should('not.be.visible');

    return new OrderReviewPage;
  }
}

export {PaymentPage};
