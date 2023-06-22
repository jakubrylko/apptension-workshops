import { useQuery } from '../support/graphql/use.query';
import * as query from '../support/graphql/query';
import { loginVariables } from '../support/graphql/variables';

describe('GraphQL - Homework', () => {
  it('Task 1', () => {
    // Login
    useQuery('loginFormMutation', query.loginFormMutation, loginVariables).then((response) => {
      expect(response.status).eql(200);
    });

    // Delete non-existent item
    const fakeId = { input: { id: 'fake-id' } };
    useQuery('crudDemoItemListItemDeleteMutation', query.itemDeleteMutation, fakeId).then((response) => {
      expect(response.status).eql(200);
      expect(response.body.errors[0].message).eql('No CrudDemoItem matches the given query.');
    });

    // Create new item
    const itemName = { input: { name: 'JR Test 01' } };
    useQuery('addCrudDemoItemMutation', query.addItemMutation, itemName).then((response) => {
      expect(response.status).eql(200);
      const itemId = response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id;

      // Check created item
      useQuery('crudDemoItemListQuery', query.itemListQuery).then((response) => {
        expect(response.status).eql(200);
      });
    });
  });
});
