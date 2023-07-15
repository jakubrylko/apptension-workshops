export const crudItemList = {
  data: {
    allCrudDemoItems: {
      edges: [
        {
          node: {
            id: '01',
            name: 'Mock 01',
            __typename: 'CrudDemoItemType',
          },
          __typename: 'CrudDemoItemEdge',
        },
        {
          node: {
            id: '02',
            name: 'Mock 02',
            __typename: 'CrudDemoItemType',
          },
          __typename: 'CrudDemoItemEdge',
        },
        {
          node: {
            id: '03',
            name: 'Mock 03',
            __typename: 'CrudDemoItemType',
          },
          __typename: 'CrudDemoItemEdge',
        },
      ],
      __typename: 'CrudDemoItemConnection',
    },
  },
};

export const notificationsList = {
  data: {
    hasUnreadNotifications: true,
    allNotifications: {
      edges: [
        {
          node: {
            id: '01',
            data: {
              id: '01',
              name: 'TODAY',
              user: 'jrylko+qaw@apptension.com',
              avatar: null,
            },
            createdAt: '2023-06-25T10:00:00.000',
            readAt: null,
            type: 'CRUD_ITEM_CREATED',
            __typename: 'NotificationType',
          },
          __typename: 'NotificationEdge',
        },
        {
          node: {
            id: '02',
            data: {
              id: '02',
              name: 'TODAY-2',
              user: 'jrylko+qaw@apptension.com',
              avatar: null,
            },
            createdAt: '2023-06-25T10:00:00.000',
            readAt: null,
            type: 'CRUD_ITEM_CREATED',
            __typename: 'NotificationType',
          },
          __typename: 'NotificationEdge',
        },
        {
          node: {
            id: '03',
            data: {
              id: '03',
              name: 'TODAY-4',
              user: 'jrylko+qaw@apptension.com',
              avatar: null,
            },
            createdAt: '2023-06-25T10:00:00.000',
            readAt: null,
            type: 'CRUD_ITEM_CREATED',
            __typename: 'NotificationType',
          },
          __typename: 'NotificationEdge',
        },
        {
          node: {
            id: '04',
            data: {
              id: '04',
              name: 'TODAY+2',
              user: 'jrylko+qaw@apptension.com',
              avatar: null,
            },
            createdAt: '2023-06-25T10:00:00.000',
            readAt: null,
            type: 'CRUD_ITEM_CREATED',
            __typename: 'NotificationType',
          },
          __typename: 'NotificationEdge',
        },
        {
          node: {
            id: '05',
            data: {
              id: '05',
              name: 'TODAY+4',
              user: 'jrylko+qaw@apptension.com',
              avatar: null,
            },
            createdAt: '2023-06-25T10:00:00.000',
            readAt: null,
            type: 'CRUD_ITEM_CREATED',
            __typename: 'NotificationType',
          },
          __typename: 'NotificationEdge',
        },
      ],
      pageInfo: {
        endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
        hasNextPage: false,
        __typename: 'PageInfo',
      },
      __typename: 'NotificationConnection',
    },
    __typename: 'Query',
  },
};
