export const LOGIN_USER_AUTH = {
  email: Cypress.env('jr_email'),
  password: Cypress.env('jr_password'),
  sessionID: 'LOGIN_USER',
};

export const BASIC_AUTH_DATA = {
  auth: {
    username: Cypress.env('BASIC_AUTH_LOGIN'),
    password: Cypress.env('BASIC_AUTH_PASSWORD'),
  },
};
