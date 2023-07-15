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

export const setNotificationDate = ({ days }) => {
  const notificationDate = new Date(new Date().setDate(new Date().getDate() + days));
  const formattedDate = notificationDate.toISOString()
  return formattedDate;
};
