export const loginVariables = {
  input: {
    email: Cypress.env('jr_email'),
    password: Cypress.env('jr_password'),
  },
};

export const randomNameGen = (number = 100, name = 'JR Test') => {
  const randomNumber = Math.round(Math.random() * number);
  const randomName = `${name} ${randomNumber}`;
  return randomName;
};

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
