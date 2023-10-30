export const PAYMENT_TOAST = '[data-testid="toast-1"]'

export const fillStripeField = (number, data) => {
  cy.get('iframe[title*="input frame"]')
    .eq(number)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .find('.InputElement')
    .type(data);
};
