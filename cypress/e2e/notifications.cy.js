import { crudItemList, notificationsList } from '../support/graphql/mocks';
import { aliasQuery } from '../support/graphql/utils';
import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { authenticate } from '../support/auth/auth';
import { setNotificationDate } from '../support/graphql/data.gen';

const baseUrl = Cypress.env('saas_url');

describe('GraphQL - Intercept', () => {
  xit('Should intercept CRUD item list', () => {
    cy.intercept('POST', '**/api/graphql/', (req) => {
      aliasQuery(req, 'crudDemoItemListQuery');
      req.reply((res) => {
        res.body = crudItemList;
      });
    });

    authenticate(LOGIN_USER_AUTH);
    cy.visit(`${baseUrl}`, BASIC_AUTH_DATA);
    cy.contains('CRUD').click();

    const itemsNumber = crudItemList.data.allCrudDemoItems.edges.length;
    cy.get('div.group').should('have.length', itemsNumber);
  });

  it('Should intercept notifications list', () => {
    Cypress.on('uncaught:exception', () => false);

    cy.intercept('POST', '**/api/graphql/', (req) => {
      aliasQuery(req, 'notificationsListQuery');
      req.reply((res) => {
        res.body = notificationsList;
      });
    });

    authenticate(LOGIN_USER_AUTH);
    cy.visit(`${baseUrl}`, BASIC_AUTH_DATA);

    cy.get('[data-testid="notifications-trigger-testid"]').as('notificationBell');
    cy.get('@notificationBell').click();
    cy.get('li.list-none').should('have.length', 5);
    cy.pause();

    cy.get('li.list-none')
      .find('button')
      .each(($button) => {
        cy.wrap($button).click();
      })
      .then(() => {
        const { edges } = notificationsList.data.allNotifications;
        edges.forEach(($edge) => {
          // eslint-disable-next-line no-param-reassign
          $edge.node.readAt = setNotificationDate();
        });
        notificationsList.data.hasUnreadNotifications = false;
      });
    cy.pause();

    cy.reload();
    cy.get('@notificationBell').click();
    cy.get('li.list-none').each(($item) => {
      cy.wrap($item).should('have.attr', 'data-status', 'read');
    });
  });
});
