import {TripettoSurveyPage as HanaSurveyPage} from "../pages/TripettoSurveyPage";
import * as customers from '../fixtures/customerDetails.json';
import * as answers from '../fixtures/formAnswers.json';
import * as testData from '../test-data/ed-e2e-test-data.json';

let surveyPage = new HanaSurveyPage(false, 'hana');
let productSelectionPage;
let checkoutPage;
let deliveryDetailsPage;
let paymentPage;
let orderReviewPage;

describe('HANA product purchase spec', () => {

  it('performs the entire hana checkout flow including redirect, consultation, prod selection and checkout.', () => {
    surveyPage.open_page();  
    productSelectionPage = surveyPage.complete_survey(answers.hanaForm);

    checkoutPage = productSelectionPage.complete_product_and_pack_selection(testData.e2e_Hana.pack_size);

    deliveryDetailsPage = checkoutPage.fill_in_customer_details(customers.valid_customer);

    paymentPage = deliveryDetailsPage.fill_in_delivery_address_for_customer(customers.valid_customer);

    orderReviewPage = paymentPage.fill_in_payment_info(customers.credit_card.Visa);

    orderReviewPage.check_order_has_reference_number().check_order_contains_product(testData.e2e_Hana.product_name, testData.e2e_Hana.pack_size);
  })
})
