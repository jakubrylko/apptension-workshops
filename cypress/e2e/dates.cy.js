import { logIn, BASIC_AUTH_DATA } from '../support/auth';
import { ariaLabelSelector, assertInputDate, DATE_INPUT } from '../support/calendar';

const email = Cypress.env('email');
const password = Cypress.env('password');
const basicAuthData = BASIC_AUTH_DATA;

describe('Dates', () => {
  it('Should verify selected date', () => {
    logIn(email, password, basicAuthData);

    cy.visit('/organizations/93433/calendar', basicAuthData);

    assertInputDate({ days: -3 });

    cy.get(DATE_INPUT).click();

    // const timestamp = new Date().setHours(0, 0, 0, 0);
    // cy.get(`[data-timestamp="${timestamp}"]`).click();

    const ariaLabel = ariaLabelSelector();
    cy.get(`[aria-label="${ariaLabel}"]`).click();

    assertInputDate({ days: 0 });
  });
});
