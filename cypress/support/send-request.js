const BASE_URL = Cypress.env('teamdeck_api');
const API_KEY = { 'X-Api-Key': Cypress.env('td_api_key') };

export const sendRequest = (method, endpoint, body = null) =>
  cy.api({
    method,
    url: BASE_URL + endpoint,
    headers: API_KEY,
    body,
  });
