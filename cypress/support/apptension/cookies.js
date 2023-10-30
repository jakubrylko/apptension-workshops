export const closeCookieModal = () => {
  cy.contains('Okay').click();
  cy.get('#hs-eu-cookie-confirmation').should('not.be.visible');
};
