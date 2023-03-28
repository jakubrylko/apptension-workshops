describe('API testing', () => {
  it('should get user info', () => {
    cy.request({
      method: 'GET',
      url: 'https://stage.api.teamdeck.io/v1/projects',
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });
});
