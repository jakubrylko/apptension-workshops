import { closeCookieModal } from '../support/apptension/cookies';

describe('Visual testing', () => {
  it('Job categories should be in the viewport', () => {
    Cypress.on('uncaught:exception', () => false)

    cy.visit(Cypress.env('appten_url'));
    closeCookieModal();

    cy.contains('Careers').click();
    cy.url().should('contain', 'careers');

    cy.isNotInViewport('.job-categories');
    cy.contains('Make IT happen').click();
    cy.isInViewport('.job-categories');

    cy.isInViewport('h2:contains("Our Career Opportunities")');
    cy.isInViewport('Our Career Opportunities', { text: true });
  });
});
