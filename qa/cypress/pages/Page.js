class Page {

  driver;
  url;
  ignoreHttpCode;
  
  constructor(url, ignoreHttpCode) {
    this.setUrl(url);
    this.setIgnoreHttpCode(ignoreHttpCode);
  }

  setUrl(url) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  setIgnoreHttpCode(value) {
    this.ignoreHttpCode = value;
  }
  
  getIgnoreHttpCode() {
    return this.ignoreHttpCode; 
  }

  navigateToUrl(url, ignoreHttpCode) {
    cy.visit({url: url, failOnStatusCode: ignoreHttpCode});
    return this;
  }

  check_url_path_contains_text(textToCheck) {
    return cy.url()
      .should('include', textToCheck);
  }

  check_page_contains_text(textToCheck) {
    return cy.contains(textToCheck).should('be.visible');
  }

  getIframeDocument(iframeLocator) {
    return cy
      .get(iframeLocator).wait(500)
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its('0.contentDocument').should('exist')
  }

  getIframeBody(iframeLocator) {
    // get the document
    return this.getIframeDocument(iframeLocator)
      // automatically retries until body is loaded
      .its('body').should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  }

  click_button_inside_iframe(iframeLocator, target, content) {
    this.getIframeBody(iframeLocator).find(target)
      .contains(content)
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  fill_in_field_inside_iframe(iframeLocator, target, content) {
    this.getIframeBody(iframeLocator).find(target)
      .should('be.visible')
      .type(content);
    return this;
  }

  check_field_inside_iframe_contains_text(iframeLocator, target, text) {
    this.getIframeBody(iframeLocator).contains(text)
    .should('be.visible')
    .should('have.text', text)
    return this;
  }

  open_page() {
    return this.navigateToUrl(this.getUrl(), this.getIgnoreHttpCode());
  }

  click_element(element) {
    return cy.wrap(element).should('be.visible').click();
  }
}

export {Page};
