import { closeCookieModal } from '../support/apptension/cookies';

describe('Visual testing', () => {
  it('Job categories should be in the viewport', () => {
    cy.visit('https://www.apptension.com');
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
