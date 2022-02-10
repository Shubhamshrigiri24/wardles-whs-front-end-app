/// <reference types="Cypress" />

import {Page} from './Page';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class OrderReviewPage extends Page {
    constructor(ignoreHttpCode) {
        super(httpRoutes.hana.ConfirmationPath, ignoreHttpCode);
    }

    check_order_contains_product(product_name, product_strength) {
        cy.get('h5')
        .contains(product_name)
        .should('be.visible')
        .should('have.text', (product_name.concat(" ", product_strength)));
        return this;
    }

    check_order_has_reference_number() {
        cy.contains('Your order number')
        .should('be.visible');
        return this;
    }
}

export {OrderReviewPage};