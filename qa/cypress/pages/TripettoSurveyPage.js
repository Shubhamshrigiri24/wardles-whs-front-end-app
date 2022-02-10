import {Page} from './Page';
import {ProductSelectionAndOverviewPage} from './ProductSelectionAndOverviewPage';
import {OldProductSelectionPage} from './OldProductSelectionPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class TripettoSurveyPage extends Page {
  constructor(ignoreHttpCode, survey_type='ed') {
    let page_url = (survey_type) => {
      if (survey_type === "ed") {
        return httpRoutes.ed.ConsultationPath;
      }
      else if (survey_type === "hana") {
        return httpRoutes.hana.ConsultationPath;
      }
    }
    super(page_url(survey_type), ignoreHttpCode);
    this.survey_type = survey_type;
  }

  // TEXT CONTENT
  edProductSelectionButtonText= 'Select an ED treatment';
  hanaProductSelectionButtonText= 'Choose from available pack sizes';

  // LOCATORS
  tripettoCheckboxBlockLocator = '[data-block="tripetto-block-checkboxes"] span';
  tripettoInputBlockLocator = '[data-block="tripetto-block-number"] input';
  selectTreatmentButtonLocator = 'button span span';
  edSureveryIframeLocator = 'iframe[title*="ED flow"]';
  hanaSureveryIframeLocator = 'iframe[title="Hana"]';
  
  get_survey_iframe() {
    if (this.survey_type==='ed') {
      return this.edSureveryIframeLocator;
    }
    else if (this.survey_type==='hana') {
      return this.hanaSureveryIframeLocator;
    }
  }
  // ACTIONS
  answer_question(type, answer) {
    if (type === 'radio') {
      this.click_button_inside_iframe(
        this.get_survey_iframe(), 
        this.tripettoCheckboxBlockLocator, 
        answer);
    }
    else if (type === 'input') {
      this.fill_in_field_inside_iframe(
        this.get_survey_iframe(), 
        this.tripettoInputBlockLocator, 
        answer);
    }
    return this;
  }

  submit_answer() {
    return this.click_button_inside_iframe(
      this.get_survey_iframe(), 'span', 'Submit'
      );
  }

  click_select_treatment_button() {
    this.click_button_inside_iframe(
      this.get_survey_iframe(), 
      this.selectTreatmentButtonLocator, 
      (() => {
        if (this.survey_type === "ed")
        return this.edProductSelectionButtonText;
        else if (this.survey_type === "hana")
        return this.hanaProductSelectionButtonText;
      })()
      );
    return this.product_type_selection_page();
  }

  product_type_selection_page() {
    if (this.survey_type === "ed") {
      return new ProductSelectionAndOverviewPage;
    }
    else if (this.survey_type === "hana") {
      return new OldProductSelectionPage;
    }
  }

  check_survey_message(message) {
    return this.check_field_inside_iframe_contains_text(
      this.get_survey_iframe(), 'h2>span', message
    )
  }

  close_survey() {
    return this.click_button_inside_iframe(
      this.get_survey_iframe(), 'span', 'Close chat'
      );
  }

  answer_survey_questions(form) {
    const f = Object.entries(form);
    for (const q of f) {
      cy.wait(500);
      this.answer_question(q[1].T, q[1].A);
      this.submit_answer();
    }
    return this;
  }

  complete_survey(form) {
    this.answer_survey_questions(form);
    let nextPage = this.click_select_treatment_button();
    return nextPage;
  }
}

export {TripettoSurveyPage as TripettoSurveyPage};
