export const LOGIN_USER_AUTH = {
  email: Cypress.env('email'),
  password: Cypress.env('password'),
  sessionID: 'LOGIN_USER',
};

export const BASIC_AUTH_DATA = {
  auth: {
    username: Cypress.env('BASIC_AUTH_LOGIN'),
    password: Cypress.env('BASIC_AUTH_PASSWORD'),
  },
};
