import { logIn, BASIC_AUTH_DATA } from '../support/auth';
import { ariaLabelSelector, assertInputDate, selectTimestamp, DATE_INPUT } from '../support/calendar';

const email = Cypress.env('email');
const password = Cypress.env('password');
const basicAuthData = BASIC_AUTH_DATA;

describe('Dates', () => {
  beforeEach(() => {
    logIn(email, password, basicAuthData);
    cy.visit('/organizations/93433/calendar', basicAuthData);
  });

  it('Should verify selected date with timestamp', () => {
    assertInputDate({ days: -3 });

    cy.get(DATE_INPUT).click();

    const timestamp = new Date().setHours(0, 0, 0, 0);
    selectTimestamp(timestamp);

    assertInputDate({ days: 0 });
  });

  it('Should verify selected date with arialabel', () => {
    assertInputDate({ days: -3 });

    cy.get(DATE_INPUT).click();

    const ariaLabel = ariaLabelSelector();
    cy.get(`[aria-label="${ariaLabel}"]`).click();

    assertInputDate({ days: 0 });
  });
});
