import {Page} from'./Page';
import {TripettoSurveyPage} from './TripettoSurveyPage';
import {ProductsOverviewPage} from './ProductsOverviewPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class EdPreSurveyPage extends Page {

  constructor (ignoreHttpCode) {
    super(httpRoutes.ed.StartPath, ignoreHttpCode);
  }

  // LOCATORS
  closeButtonLocator = 'button[data-testid="close"]';
  startYourConsulationButtonLocator = 'a[data-testid="next-button"]';

  // ELEMENTS
  getCloseButton() {
    return cy.get(this.closeButtonLocator);
  }

  getStartConsultationButton() {
    return cy.get(this.startYourConsulationButtonLocator);
  }

  // ACTIONS
  exit_ed_survey() {
    this.getCloseButton()
    .should('be.visible')
    .click();
    return new ProductsOverviewPage;
  }

  start_consultation(survey_type) {
    this.getStartConsultationButton()
    .should('be.visible')
    .click();
    return new TripettoSurveyPage(survey_type);
  }
}

export {EdPreSurveyPage};
