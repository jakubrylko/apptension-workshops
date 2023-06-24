import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { HOMEPAGE } from '../support/navigation';
import { WELCOME_PHRASE } from '../support/home/home.selectors';
import { authenticate } from '../support/auth/auth';

import { API_PATH, BASIC_AUTH, useQuery } from '../support/graphql/use.query';
import { notificationsListQuery, loginFormMutation } from '../support/graphql/query';
import { loginVariables } from '../support/graphql/variables';

describe('Login page', () => {
  xit('Should login with UI', () => {
    authenticate(LOGIN_USER_AUTH);
    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);

    cy.api({
      method: 'POST',
      url: API_PATH,
      body: {
        operationName: 'notificationsListQuery',
        query: notificationsListQuery,
        variables: { count: 20 },
      },
      headers: {
        authorization: BASIC_AUTH,
      },
    }).then((response) => {
      expect(response.status).eql(200);
    });
  });

  it('Should login with query', () => {
    useQuery('loginFormMutation', loginFormMutation, loginVariables).then((response) => {
      const token = response.body.data.tokenAuth.access;
      const refreshToken = response.body.data.tokenAuth.refresh;
      cy.writeFile('cypress/fixtures/token.json', { token, refreshToken });
    });

    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
    cy.contains(WELCOME_PHRASE).should('be.visible');
  });

  it('Should login with token', () => {
    cy.fixture('token').then((token) => {
      cy.setCookie('token', token.token);
      cy.setCookie('refresh_token', token.refreshToken);
    });

    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
    cy.contains(WELCOME_PHRASE).should('be.visible');
  });
});
