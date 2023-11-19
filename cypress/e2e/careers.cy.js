/// <reference types='cypress' />

import { assertTechStack, clickOnDepartment } from '../support/apptension/tech-stack';
import { closeCookieModal } from '../support/apptension/cookies';

describe('Apptension careers', () => {
  Cypress.on('uncaught:exception', () => false);

  it('Should return and assert tech stack count', () => {
    cy.visit(Cypress.env('apptension_url'));
    closeCookieModal();
    cy.contains('Careers').click();

    clickOnDepartment('Frontend');
    assertTechStack('Frontend');

    clickOnDepartment('Backend');
    assertTechStack('Backend');

    clickOnDepartment('Infrastructure');
    assertTechStack('Infrastructure');

    clickOnDepartment('Design');
    assertTechStack('Design');
  });
});
