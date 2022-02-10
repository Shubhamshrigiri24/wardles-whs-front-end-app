/// <reference types="Cypress" />

import {EdPreSurveyPage} from "../pages/EdPreSurveyPage";
import * as answers from '../fixtures/formAnswers.json';

let preSurveryPage = new EdPreSurveyPage(false);
let surveyPage;

describe('Erectile Dysfunction consultation scenarios', () => {

  it('Starts the erectile dysfuntion consultaion and ends it with an unsatifactory answer', ()=> {

    preSurveryPage.open_page();
    surveyPage = preSurveryPage.start_consultation();

    surveyPage.answer_survey_questions(answers.edFormNegative);
    surveyPage.check_survey_message(answers.edFormExitMessage);
    surveyPage.close_survey();

    surveyPage.check_url_path_contains_text('erectile-dysfunction');
  })
})