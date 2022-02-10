import * as CheckoutPage from "../pages/CheckoutPage";
import * as DeliveryDetailsPage from "../pages/DeliveryDetailsPage";
import * as PaymentPage from "../pages/PaymentPage";
import * as httpRoutes from '../fixtures/httpRoutes.json';
import * as customers from '../fixtures/customerDetails.json';

let checkoutPage = new CheckoutPage(false);
let deliveryDetailsPage = new DeliveryDetailsPage(false);
let paymentPage = new PaymentPage(false);

context('ED product checkout spec', () => {

  it('Fills in the customer imfomation with valid data and moves forward.', () => {

    checkoutPage.open_page();

    checkoutPage.select_title(customers.valid_customer.title);
    checkoutPage.fill_in_first_name(customers.valid_customer.firstName);
    checkoutPage.fill_in_last_name(customers.valid_customer.lastName);
    checkoutPage.fill_in_email(customers.valid_customer.email);
    checkoutPage.fill_in_phonenumber(customers.valid_customer.phone);
    checkoutPage.fill_in_postcode(customers.valid_customer.postcode);

    checkoutPage.click_search_button();

    checkoutPage.fill_in_address(1, customers.valid_customer.addressLine1);
    checkoutPage.fill_in_address(2, customers.valid_customer.addressLine2);
    checkoutPage.fill_in_city(customers.valid_customer.city);

    checkoutPage.select_health_advice_option(customers.valid_customer.option);

    let result = checkoutPage.click_next_button();

    result.check_url_path_contains_text(httpRoutes.ed.edDeliveryPath);
    result.check_page_contains_text('Delivery details');
  })

  it('Fills in the same customer address for delivery', () => {

    deliveryDetailsPage.open_page();

    // deliveryPage.use_same_details();

    deliveryDetailsPage.select_title(customers.valid_customer.title);
    deliveryDetailsPage.fill_in_first_name(customers.valid_customer.firstName);
    deliveryDetailsPage.fill_in_last_name(customers.valid_customer.lastName);
    deliveryDetailsPage.fill_in_postcode(customers.valid_customer.postcode);

    deliveryDetailsPage.click_search_button();

    deliveryDetailsPage.fill_in_address(1, customers.valid_customer.addressLine1);
    deliveryDetailsPage.fill_in_address(2, customers.valid_customer.addressLine2);
    deliveryDetailsPage.fill_in_city(customers.valid_customer.city);

    let result = deliveryDetailsPage.click_next_button();

    result.check_url_path_contains_text(httpRoutes.ed.edPaymentPath);
    result.check_page_contains_text('Select a method of payment');
  })

  it('Makes a payment using a accepted credit card.', () => {

    paymentPage.open_page();
    cy.wait(5000);

    paymentPage.fill_in_card_number(customers.credit_card.Visa.card_number);
    paymentPage.fill_in_expiration_date(customers.credit_card.Visa.expiration_date);
    paymentPage.fill_in_cvv(customers.credit_card.Visa.cvv);

    paymentPage.click_pay_button();
    cy.wait(5000);

    paymentPage.fill_in_opt(customers.credit_card.Visa.otp);
    paymentPage.click_submit();

    // result.check_url_path_contains_text(httpRoutes.ed.edPaymentPath);
    // result.check_page_contains_text('');
  })
})
