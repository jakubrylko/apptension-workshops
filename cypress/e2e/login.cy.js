import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { HOMEPAGE } from '../support/navigation';
import { authenticate } from '../support/auth/auth';

import { API_PATH, BASIC_AUTH, useQuery } from '../support/graphql/use.query';
import { notificationsListQuery, loginFormMutation } from '../support/graphql/query';
import { loginVariables } from '../support/graphql/variables';

describe('Login page', () => {
  it('Should log in with UI', () => {
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
      expect(response.status).eql(200);
      const accessToken = response.body.data.tokenAuth.access;
      cy.writeFile('cypress/fixtures/token.json', { accessToken });

      cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
      cy.contains('Welcome!').should('be.visible');
    });
  });

  it('Should login with token', () => {
    cy.fixture('token').then((token) => {
      cy.setCookie('token', token.accessToken);
    });

    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
    cy.contains('Welcome!').should('be.visible');
  });
});
