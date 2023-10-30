Cypress.Commands.add('isNotInViewport', (element, options = {}) => {
  const selector = options.text ? cy.contains(element) : cy.get(element);

  selector.then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();

    cy.log('Should not be in the viewport:').then(() => {
      expect(rect.top).to.be.greaterThan(bottom);
      expect(rect.bottom).to.be.greaterThan(bottom);
      expect(rect.top).to.be.greaterThan(bottom);
      expect(rect.bottom).to.be.greaterThan(bottom);
    });
  });
});

Cypress.Commands.add('isInViewport', (element, options = {}) => {
  const selector = options.text ? cy.contains(element) : cy.get(element);

  selector.then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();

    cy.log('Should be in the viewport:').then(() => {
      expect(rect.top).not.to.be.greaterThan(bottom);
      expect(rect.bottom).not.to.be.greaterThan(bottom);
      expect(rect.top).not.to.be.greaterThan(bottom);
      expect(rect.bottom).not.to.be.greaterThan(bottom);
    });
  });
});
