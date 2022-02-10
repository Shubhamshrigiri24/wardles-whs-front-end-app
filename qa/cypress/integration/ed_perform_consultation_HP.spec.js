import {EdSurveyPage} from "../pages/EdSurveyPage";
import * as httpRoutes from '../fixtures/httpRoutes.json';
import * as answers from '../fixtures/formAnswers.json';

let surveyPage = new EdSurveyPage(false);

context('ED survey spec', () => {
  beforeEach(() => {
    surveyPage.open_page();
  })

  it ('Covers the happy path of the survey, answering all questions with "Yes".', () => {
    // cy.pause();

    // Are you ordering for yourself?
    // Yes
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q1.A);
    surveyPage.submit_answer();

    // Are you 18 or over, and male?
    // Yes
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q2.A);
    surveyPage.submit_answer();

    // Do you have problems getting or keeping an erection (erectile dysfunction)?
    // Yes
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q3.A);
    surveyPage.submit_answer();

    // It’s not safe to take Viagra Connect or sildenafil if you use poppers. Together they can cause heart failure.
    // Poppers are a recreational drug said to enhance sexual experiences by increasing your blood flow. They are also known as TNT, Thrust, Kix, Ram, Rock Hard, Liquid Gold, or Amyls
    // No
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q4.A);
    surveyPage.submit_answer();

    // Do you ever experience chest pain or shortness of breath when doing light exercise?
    // Light exercise includes walking and household activities such as cleaning and laundry.
    // No
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q5.A);
    surveyPage.submit_answer();

    // Have you ever had any allergies or sensitivities to sildenafil, tadalafil or vardenafil?
    // No
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q6.A);
    surveyPage.submit_answer();

    // Have you ever experienced an episode of priapism (prolonged erection)?
    // Please select yes if you've ever had an erection that lasted more than four hours
    // No
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q7.A);
    surveyPage.submit_answer();

    // Have you ever had a broken or crushed pelvis, or a spinal cord injury?
    // No
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q8.A);
    surveyPage.submit_answer();

    // There are some health conditions which mean it's not safe for you to take Viagra Connect or sildenafil.
    // Have you had any of these problems in the last six months?
    // I haven't had any of these
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q9.A);
    surveyPage.submit_answer();

    // There are some medications which mean Viagra Connect or sildenafil aren't suitable for you to take.
    // Please tell me if you take any of these types of medication.
    // None of these
    cy.wait(4000);
    surveyPage.answer_question(answers.edForm.Q10.A);
    surveyPage.submit_answer();

    // Your order will need to be checked by a Pharmacist before we post it out to you, but you can now go ahead and place an order.
    // button span > "Select an ED treatment"
    cy.wait(4000);
    surveyPage.click_select_ed_treatment_button()
    .check_url_path_contains_text(httpRoutes.ed.edSelectionPath);
  })
})
