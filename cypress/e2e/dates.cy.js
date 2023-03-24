import { logIn, BASIC_AUTH_DATA } from '../support/auth';
import { DATE_INPUT } from '../support/calendar';

const email = Cypress.env('email');
const password = Cypress.env('password');
const basicAuthData = BASIC_AUTH_DATA;

describe('Dates', () => {
  it(`should verify selected date`, () => {
    logIn(email, password, basicAuthData);

    cy.visit('/organizations/93433/calendar', basicAuthData);

    cy.get(DATE_INPUT).then(($input) => {
      const date = $input.val();
      console.log('Date', date);
    });
  });
});
