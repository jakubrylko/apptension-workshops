import { authenticate } from '../support/auth/auth';
import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { HOMEPAGE } from '../support/login/navigation';
import { fillStripeField } from '../support/iframe/iframe';

describe('iFrame task', () => {
  const NAME = 'JR Test';
  const CARD_NUMBER = '4242424242424242';
  const YEAR = '1030';
  const CVC = '123';

  it('Should fill card details on iframe', () => {
    authenticate(LOGIN_USER_AUTH);
    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);

    cy.contains('Payments').click();
    cy.contains('$5').click();
    cy.get('[name*="name"]').type(NAME);

    fillStripeField(0, CARD_NUMBER);
    fillStripeField(1, YEAR);
    fillStripeField(2, CVC);
    // cy.pause()

    cy.contains('Pay 5 USD').click();
    cy.get('[data-testid="toast-1"]').should('exist');
    cy.get('[data-testid="toast-1"]').should('not.exist');

    cy.contains('Payments').click();
    cy.contains(NAME).should('be.visible');
    cy.get('[class*="trash"]').click();
  });
});

// document.querySelectorAll('iframe')[0].contentDocument
