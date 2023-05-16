import { logIn, BASIC_AUTH_DATA } from '../support/auth';
import { resourceList, projectList } from '../support/response-object';

const email = Cypress.env('jr_email');
const password = Cypress.env('jr_password');
const basicAuthData = BASIC_AUTH_DATA;

describe('Intercept Assignment', () => {
  beforeEach(() => {
    logIn(email, password, basicAuthData);
  });

  it('Should intercept request and assert that lists are populated', () => {
    cy.intercept('**/calendar?dataTypes=1,2,3,4**page=1**').as('resourceList');
    cy.intercept('**/calendar?dataTypes=7,1,2,4**page=1**').as('projectList');

    cy.visit('/organizations/98407/calendar', basicAuthData);
    cy.wait('@resourceList').then((response) => {
      expect(response.response.body.items).is.not.empty;
    });

    cy.contains('Projects').click();
    cy.wait('@projectList').then((response) => {
      expect(response.response.body.items).is.not.empty;
    });
  });

  it('Should intercept request and return empty lists', () => {
    cy.intercept('**/calendar?dataTypes=1,2,3,4**page=1**', {}).as('resourceList');
    cy.intercept('**/calendar?dataTypes=7,1,2,4**page=1**', {}).as('projectList');

    cy.visit('/organizations/98407/calendar', basicAuthData);
    cy.wait('@resourceList').then((response) => {
      expect(response.response.body).is.empty;
    });

    cy.contains('Projects').click();
    cy.wait('@projectList').then((response) => {
      expect(response.response.body).is.empty;
    });
  });

  it('Should intercept request and return fixtures', () => {
    cy.fixture('response-object').then((ro) => {
      cy.intercept('**/calendar?dataTypes=1,2,3,4**page=1**', ro.resourceList).as('resourceList');
      cy.intercept('**/calendar?dataTypes=7,1,2,4**page=1**', ro.projectList).as('projectList');
    });

    cy.visit('/organizations/98407/calendar', basicAuthData);
    cy.wait('@resourceList').then((response) => {
      expect(response.response.body.items).have.length(5);
      response.response.body.items.forEach(($item) => {
        expect($item.name).to.contain('Fixture');
      });
    });

    cy.contains('Projects').click();
    cy.wait('@projectList').then((response) => {
      expect(response.response.body.items).have.length(5);
      response.response.body.items.forEach(($item) => {
        expect($item.name).to.contain('Fixture');
      });
    });
  });

  it('Should intercept request and return StaticResponse objects', () => {
    cy.intercept('**/calendar?dataTypes=1,2,3,4**page=1**', resourceList).as('resourceList');
    cy.intercept('**/calendar?dataTypes=7,1,2,4**page=1**', projectList).as('projectList');

    cy.visit('/organizations/98407/calendar', basicAuthData);
    cy.wait('@resourceList').then((response) => {
      expect(response.response.body.items).have.length(3);
      response.response.body.items.forEach(($item) => {
        expect($item.name).to.contain('Mocked');
      });
    });

    cy.contains('Projects').click();
    cy.wait('@projectList').then((response) => {
      expect(response.response.body.items).have.length(3);
      response.response.body.items.forEach(($item) => {
        expect($item.name).to.contain('Mocked');
      });
    });
  });
});
