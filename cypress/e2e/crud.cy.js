import { useQuery } from '../support/graphql/use.query';
import * as query from '../support/graphql/query';

import { loginVariables } from '../support/graphql/variables';
import { BASIC_AUTH_DATA } from '../support/auth/auth.data';
import { HOMEPAGE } from '../support/navigation';

describe('GraphQL - Homework', () => {
  it('Task 1', () => {
    const randomNumber = Math.round(Math.random() * 100);
    const randomName = `JR Test ${randomNumber}`;

    // Login
    useQuery('loginFormMutation', query.loginFormMutation, loginVariables).then((response) => {
      expect(response.status).eql(200);
    });

    // Delete item
    useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
      expect(response.status).eql(200);

      const itemId =
        response.body.data.allCrudDemoItems.edges.length === 0
          ? { input: { id: '1234567890' } }
          : { input: { id: response.body.data.allCrudDemoItems.edges[0].node.id } };

      useQuery('crudDemoItemListItemDeleteMutation', query.itemDeleteMutation, itemId).then((response) => {
        expect(response.status).eql(200);
      });
    });

    // Create item
    const itemName = { input: { name: randomName } };
    useQuery('addCrudDemoItemMutation', query.addItemMutation, itemName).then((response) => {
      expect(response.status).eql(200);
      const newItemId = response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id;

      // Assert new item
      useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
        expect(response.status).eql(200);
        const createdItem = Cypress._.find(response.body.data.allCrudDemoItems.edges, { node: { id: newItemId } });
        expect(createdItem.node.id).to.exist.and.eql(newItemId);
      });
    });

    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
    cy.contains('CRUD Example Items').click();
    cy.contains(randomName).should('be.visible');
  });

  it('Task 2', () => {
    const randomNumber = Math.round(Math.random() * 100);
    const randomName = `JR Test ${randomNumber}`;

    // Login
    useQuery('loginFormMutation', query.loginFormMutation, loginVariables).then((response) => {
      expect(response.status).eql(200);
    });

    // Delete item
    useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
      expect(response.status).eql(200);

      const itemId =
        response.body.data.allCrudDemoItems.edges.length === 0
          ? { input: { id: '1234567890' } }
          : { input: { id: response.body.data.allCrudDemoItems.edges[0].node.id } };

      useQuery('crudDemoItemListItemDeleteMutation', query.itemDeleteMutation, itemId).then((response) => {
        expect(response.status).eql(200);
      });
    });

    // Create item
    const itemName = { input: { name: randomName } };
    useQuery('addCrudDemoItemMutation', query.addItemMutation, itemName).then((response) => {
      expect(response.status).eql(200);
      const newItemId = response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id;

      cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
      cy.contains('CRUD Example Items').click();
      cy.contains(randomName).should('be.visible');

      const updatedItem = {
        input: {
          id: newItemId,
          name: `${randomName} Updated`,
        },
      };

      // Update item
      useQuery('editCrudDemoItemContentMutation', query.itemEditMutation, updatedItem).then((response) => {
        expect(response.status).eql(200);
      });

      cy.reload();
      cy.contains(`${randomName} Updated`).should('be.visible');
    });
  });
});
