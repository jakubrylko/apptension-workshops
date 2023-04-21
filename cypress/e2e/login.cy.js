import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';

import { NAVIGATION } from '../support/navigation';
import { authenticate } from '../support/auth/auth';

const { HOMEPAGE } = NAVIGATION;

describe('Login page', () => {
  it.only('Should log in', () => {
    const userData = LOGIN_USER_AUTH;

    authenticate(userData);
    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
  });
});
