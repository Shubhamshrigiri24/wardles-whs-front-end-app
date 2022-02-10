import {EdPreSurveyPage} from "../pages/EdPreSurveyPage";
import * as customers from '../fixtures/customerDetails.json';
import * as answers from '../fixtures/formAnswers.json';
import * as testData from '../test-data/ed-e2e-test-data.json';

let preSurveyPage = new EdPreSurveyPage(false);
let surveyPage;
let productSelectionPage;
let checkoutPage;
let deliveryDetailsPage;
let paymentPage;
let orderReviewPage;

describe('ED product purchase spec', () => {

  it('performs the consultation then places a valid order for Tadalafil, 10 mg, 16 tablets.', () => {
    
    preSurveyPage.open_page();
    surveyPage = preSurveyPage.start_consultation();

    productSelectionPage = surveyPage.complete_survey(answers.edFormLong);

    checkoutPage = productSelectionPage.complete_product_and_pack_selection(
      testData.e2e_Tadalafil.product_name, 
      testData.e2e_Tadalafil.product_strength, 
      testData.e2e_Tadalafil.pack_size,
      testData.e2e_Tadalafil.product_price
      );

    deliveryDetailsPage = checkoutPage.fill_in_customer_details(customers.valid_customer);

    paymentPage = deliveryDetailsPage.fill_in_delivery_address_for_customer(customers.valid_customer);

    orderReviewPage = paymentPage.fill_in_payment_info(customers.credit_card.Visa);

    orderReviewPage.check_order_has_reference_number()
    .check_order_contains_product(
      testData.e2e_Tadalafil.product_name,
      testData.e2e_Tadalafil.product_strength
      );
  })

  it('performs the consultation then places a valid order for Viagra Connect, 50 mg, 4 tablets.', () => {
    
    preSurveyPage.open_page();
    surveyPage = preSurveyPage.start_consultation();

    productSelectionPage = surveyPage.complete_survey(answers.edFormLong);

    checkoutPage = productSelectionPage.complete_product_and_pack_selection(
      testData.e2e_Viagra.product_name, 
      testData.e2e_Viagra.product_strength, 
      testData.e2e_Viagra.pack_size,
      testData.e2e_Viagra.product_price
      );

    deliveryDetailsPage = checkoutPage.fill_in_customer_details(customers.valid_customer);

    paymentPage = deliveryDetailsPage.fill_in_delivery_address_for_customer(customers.valid_customer);

    orderReviewPage = paymentPage.fill_in_payment_info(customers.credit_card.Visa);

    orderReviewPage.check_order_has_reference_number()
    .check_order_contains_product(
      testData.e2e_Viagra.product_name,
      testData.e2e_Viagra.product_strength
      );
  })
})
