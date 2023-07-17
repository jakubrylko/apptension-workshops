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
