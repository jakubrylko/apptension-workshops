import { gql } from 'graphql-tag';
import { print } from 'graphql';

import { BASIC_AUTH_DATA, LOGIN_USER_AUTH } from '../support/auth/auth.data';
import { NAVIGATION } from '../support/navigation';
import { authenticate } from '../support/auth/auth';

const { HOMEPAGE } = NAVIGATION;
const API_PATH = Cypress.env('apiPath');

const operationName = 'notificationsListQuery';
const query = print(gql`
  query notificationsListQuery($count: Int = 20, $cursor: String) {
    ...notificationsListContentFragment
    ...notificationsButtonContent
  }

  fragment notificationsListContentFragment on Query {
    hasUnreadNotifications
    allNotifications(first: $count, after: $cursor) {
      edges {
        node {
          id
          data
          createdAt
          readAt
          type
          __typename
        }
        __typename
      }
      pageInfo {
        endCursor
        hasNextPage
        __typename
      }
      __typename
    }
    __typename
  }

  fragment notificationsButtonContent on Query {
    hasUnreadNotifications
    __typename
  }
`);

describe('Login page', () => {
  it('Should log in', () => {
    const userData = LOGIN_USER_AUTH;

    authenticate(userData);
    cy.visit(HOMEPAGE, BASIC_AUTH_DATA);

    cy.request({
      method: 'POST',
      url: API_PATH,
      body: {
        operationName,
        query,
        variables: {
          conut: 20
        },
      },
      headers: {
        authorization: Cypress.env('BASIC_AUTH_HEADER'),
      },
    }).then((response) => {
      cy.log(response);
      expect(response.status).eql(200);
    });
  });
});
