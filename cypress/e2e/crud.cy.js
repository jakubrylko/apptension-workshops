import * as query from '../support/graphql/query';
import { useQuery } from '../support/graphql/use.query';
import { loginVariables } from '../support/graphql/variables';
import { randomNameGen } from '../support/graphql/data.gen';
import { BASIC_AUTH_DATA } from '../support/auth/auth.data';

describe('GraphQL - Homework', () => {
  it('Task 1', () => {
    const randomName = randomNameGen();

    // Login
    useQuery('loginFormMutation', query.loginFormMutation, loginVariables);

    // Delete item
    useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
      if (response.body.data.allCrudDemoItems.edges.length !== 0) {
        const itemId = { input: { id: response.body.data.allCrudDemoItems.edges[0].node.id } };
        useQuery('crudDemoItemListItemDeleteMutation', query.itemDeleteMutation, itemId);
      } else {
        cy.log('No items to delete!');
      }
    });

    // Create item
    const newItemName = { input: { name: randomName } };
    useQuery('addCrudDemoItemMutation', query.addItemMutation, newItemName).then((response) => {
      const newItemId = response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id;

      // Assert new item
      useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
        const lastCreatedItem = Cypress._.find(response.body.data.allCrudDemoItems.edges, { node: { id: newItemId } });
        expect(lastCreatedItem.node.id).to.exist.and.eql(newItemId);
      });
    });

    cy.visit('/', BASIC_AUTH_DATA);
    cy.contains('CRUD').click();
    cy.contains(randomName).should('be.visible');
  });

  it('Task 2', () => {
    const randomName = randomNameGen();

    // Login
    useQuery('loginFormMutation', query.loginFormMutation, loginVariables);

    // Delete item
    useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
      if (response.body.data.allCrudDemoItems.edges.length !== 0) {
        const itemId = { input: { id: response.body.data.allCrudDemoItems.edges[0].node.id } };
        useQuery('crudDemoItemListItemDeleteMutation', query.itemDeleteMutation, itemId);
      } else {
        cy.log('No items to delete!');
      }
    });

    // Create item
    const newItemName = { input: { name: randomName } };
    useQuery('addCrudDemoItemMutation', query.addItemMutation, newItemName).then((response) => {
      const newItemId = response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id;

      cy.visit('/', BASIC_AUTH_DATA);
      cy.contains('CRUD').click();
      cy.contains(randomName).should('be.visible');

      const updatedItem = {
        input: {
          id: newItemId,
          name: `${randomName} Updated`,
        },
      };

      // Update item
      useQuery('editCrudDemoItemContentMutation', query.itemEditMutation, updatedItem);

      cy.reload();
      cy.contains(`${randomName} Updated`).should('be.visible');
    });
  });
});
