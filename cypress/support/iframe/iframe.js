export const fillStripeField = (number, data) => {
  cy.get('iframe[title*="input frame"]')
    .eq(number)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(($iframe) => {
      cy.wrap($iframe).find('input').eq(1).type(data);
    });
};
