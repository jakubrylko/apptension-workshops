import { gql } from 'graphql-tag';
import { print } from 'graphql';

export const notificationsListQuery = print(gql`
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

export const loginFormMutation = print(gql`
  mutation loginFormMutation($input: ObtainTokenMutationInput!) {
    tokenAuth(input: $input) {
      access
      refresh
      otpAuthToken
      __typename
    }
  }
`);

export const itemDeleteMutation = print(gql`
mutation crudDemoItemListItemDeleteMutation($input: DeleteCrudDemoItemMutationInput!) {
  deleteCrudDemoItem(input: $input) {
    deletedIds
    __typename
  }
}
`);

export const addItemMutation = print(gql`
mutation addCrudDemoItemMutation($input: CreateCrudDemoItemMutationInput!) {
  createCrudDemoItem(input: $input) {
    crudDemoItemEdge {
      node {
        id
        name
        __typename
      }
      __typename
    }
    __typename
  }
}
`);

export const itemListQuery = print(gql`
query crudDemoItemListQuery {
  allCrudDemoItems(first: 100) {
    edges {
      node {
        id
        ...crudDemoItemListItem
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment crudDemoItemListItem on CrudDemoItemType {
  id
  name
  __typename
}
`);