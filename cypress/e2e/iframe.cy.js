import { useQuery } from '../support/graphql/use.query';
import { loginFormMutation } from '../support/graphql/query';
import { loginVariables } from '../support/graphql/variables';
import { BASIC_AUTH_DATA } from '../support/auth/auth.data';
import { PAYMENT_TOAST, fillStripeField } from '../support/iframe/iframe';

describe('iFrame task', () => {
  const NAME = 'JR Test';
  const CARD_NUMBER = '4242424242424242';
  const YEAR = '1030';
  const CVC = '123';

  it('Should fill card details in iframe', () => {
    useQuery('loginFormMutation', loginFormMutation, loginVariables);
    cy.visit('/', BASIC_AUTH_DATA);

    cy.contains('Payments').click();
    cy.contains('$5').click();
    cy.get('[name*="name"]').type(NAME);

    fillStripeField(0, CARD_NUMBER);
    fillStripeField(1, YEAR);
    fillStripeField(2, CVC);
    // cy.pause()

    cy.contains('Pay 5 USD').click();
    cy.get(PAYMENT_TOAST).should('be.visible');
    cy.get(PAYMENT_TOAST).should('not.exist');

    cy.contains('Payments').click();
    cy.contains(NAME).should('be.visible');
    cy.get('[class*="trash"]').click();
  });
});

// document.querySelectorAll('iframe')[0].contentDocument
