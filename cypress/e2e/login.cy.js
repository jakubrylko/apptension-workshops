import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { NAVIGATION } from '../support/navigation';
import { authenticate } from '../support/auth/auth';

import { API_PATH, BASIC_AUTH } from '../support/graphql/use.query';
import { notificationsListQuery } from '../support/graphql/query';

const { HOMEPAGE } = NAVIGATION;

describe('Login page', () => {
  it('Should log in', () => {
    const userData = LOGIN_USER_AUTH;

    authenticate(userData);
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
});
