export const API_PATH = Cypress.env('saas_api');

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
