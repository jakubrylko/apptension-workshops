/// <reference types='cypress' />

import { assertTechStack } from '../support/apptension/tech-stack';
import { closeCookieModal } from '../support/apptension/cookies';

describe('Apptension careers', () => {
  Cypress.on('uncaught:exception', () => false);

  it('Should return and assert tech stack count', () => {
    cy.visit(Cypress.env('appten_url'));
    closeCookieModal();

    cy.contains('Careers').click();
    assertTechStack('Frontend');
    assertTechStack('Backend');
    assertTechStack('Infrastructure');
    assertTechStack('Design');
  });
});
