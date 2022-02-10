import EdPreSurveyPage from '../pages/EdPreSurveyPage';

let preSurveyPage = new EdPreSurveyPage(false);

describe('Check that the user is redirected to the survey page when clicking the button', () => {
  beforeEach(() => {
    preSurveyPage.open_page();
  })

  it("Checks that the ED flow start page can be reached", () => {
    preSurveyPage.check_page_contains_text("Complete your free online consultation");
  })

  it("Checks that the ED flow can be canceled", () => {
    // cy.pause();
    preSurveyPage.check_page_contains_text("Complete your free online consultation");
    preSurveyPage.exit_ed_survey()
      .check_page_contains_text("Our products");
  })

  it("Starts the ED flow and validateds that the flow is started.", () => {
    preSurveyPage.check_page_contains_text("Complete your free online consultation");
    preSurveyPage.start_consultation()
      .check_url_path_contains_text('/online/ed/consultation');
    preSurveyPage.check_page_contains_text("Complete your free online consultation");
  })
})
