describe('Debugging', () => {
  it(`should use a debugger`, () => {
    cy.on('uncaught:exception', () => false);

    cy.visit(`/automation-practice-form`);

    cy.get('#firstName');
  });
});
