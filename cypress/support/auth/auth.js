/* eslint-disable import/prefer-default-export */

import { EMAIL_INPUT, LOG_IN_BTN, PASSWORD_INPUT } from '../login/login.selectors';
import { BASIC_AUTH_DATA } from './auth.data';
import { NAVIGATION } from '../login/navigation';
import { shouldShowWelcomeLabel } from '../home/home.assertion';

const BASE_URL = Cypress.env('saas_url');
const { HOMEPAGE, LOGIN_PAGE } = NAVIGATION;

export const authenticate = (authData) => {
  const { email, password, sessionID } = authData;

  cy.session(
    [email, sessionID],
    () => {
      cy.visit(BASE_URL + LOGIN_PAGE, BASIC_AUTH_DATA);
      cy.get(EMAIL_INPUT).type(email);
      cy.get(PASSWORD_INPUT).type(password);
      cy.get(LOG_IN_BTN).click();
      shouldShowWelcomeLabel();
    },
    {
      validate() {
        cy.visit(BASE_URL + HOMEPAGE, BASIC_AUTH_DATA);
        shouldShowWelcomeLabel();
      },
    }
  );
};
