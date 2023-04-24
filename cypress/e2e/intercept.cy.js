import { logIn, BASIC_AUTH_DATA } from '../support/auth';

const email = Cypress.env('email');
const password = Cypress.env('password');
const basicAuthData = BASIC_AUTH_DATA;

describe('Intercept', () => {
  it('Should intercept request', () => {
    logIn(email, password, basicAuthData);

    cy.intercept('**/autocomplete**').as('autocomplete')
    cy.visit('/organizations/93433/calendar', basicAuthData);

    cy.wait('@autocomplete').then(response => {
      cy.log(response)
      expect(response.response.body.project[0]).to.have.property('name', 'Project 1')
    })
  });
});
