export const LOGIN_USER_AUTH = {
  email: Cypress.env('jr_email'),
  password: Cypress.env('jr_password'),
  sessionID: 'LOGIN_USER',
};

export const BASIC_AUTH_DATA = {
  auth: {
    username: Cypress.env('saas_basic_auth_user'),
    password: Cypress.env('saas_basic_auth_password'),
  },
};
