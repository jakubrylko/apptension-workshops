const BASE_URL = Cypress.env('teamdeck_url') 
const EMAIL_INPUT = 'input[type="email"]';
const PASSWORD_INPUT = 'input[type="password"]';
const SIGN_IN_BTN = 'button[type="submit"]';

export const BASIC_AUTH_DATA = {
  auth: {
    username: Cypress.env('td_basic_auth_user'),
    password: Cypress.env('td_basic_auth_password'),
  },
};

export const logIn = (email, password, basicAuthData) => {
  cy.session([email, password, basicAuthData], () => {
    cy.visit(`${BASE_URL}/login`, basicAuthData);
    cy.get(EMAIL_INPUT).type(email);
    cy.get(PASSWORD_INPUT).type(password);
    cy.get(SIGN_IN_BTN).click();
    cy.url().should('contain', '/organizations');
  });
};
