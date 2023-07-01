import { crudItemList } from '../support/graphql/variables';
import { hasOperationName, aliasQuery } from '../support/graphql/utils';

import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { HOMEPAGE } from '../support/navigation';
import { authenticate } from '../support/auth/auth';

describe('GraphQL - Intercept', () => {
  it('Should intercept CRUD item list', () => {
    // cy.intercept('POST', '**/api/graphql/', (req) => {
    //   if (hasOperationName(req, 'crudDemoItemListQuery')) {
    //     req.alias = 'crudDemoItemListQuery';
    //     req.reply((res) => {
    //       res.body = crudItemList;
    //     });
    //   }
    // });

    cy.intercept('POST', '**/api/graphql/', (req) => {
      aliasQuery(req, 'crudDemoItemListQuery');
      req.reply((res) => {
        res.body = crudItemList;
      });
    });

    authenticate(LOGIN_USER_AUTH);
    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);
    cy.contains('CRUD').click();

    const itemsNumber = crudItemList.data.allCrudDemoItems.edges.length;
    cy.get('div[class*=group]').should('have.length', itemsNumber);
  });
});
