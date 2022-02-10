// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// const testEnv = require('../fixtures/testEnv.json');
// const EdPreSurveyPage = require('../pages/EdPreSurveyPage');

// let preSurveyPage = new EdPreSurveyPage;

// before(() => {
//   cy.fixture('testEnv').then(function (testEnv) {
//     this.testEnv = testEnv;
//     cy.visit(this.env.dev.baseUrl);
//   })
// })

beforeEach(() => {
  cy.log('I run before every test in every spec file!!!!!!')
})

// before(() => {
//   preSurveyPage.setUrl(testEnv.dev.baseUrl + testEnv.dev.edStart)
// })