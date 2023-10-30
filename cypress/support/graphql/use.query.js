export const API_PATH = Cypress.env('apiPath');
export const BASIC_AUTH = Cypress.env('BASIC_AUTH_HEADER');

export const useQuery = (operationName, query, variables = null) =>
  cy.api({
    method: 'POST',
    url: API_PATH,
    body: {
      operationName,
      query,
      variables
    }
  });
