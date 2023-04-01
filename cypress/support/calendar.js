export const DATE_INPUT = 'input[aria-label="Date"]';

export const assertInputDate = ({ days }) => {
  cy.get(DATE_INPUT).then(($input) => {
    const inputString = $input.val(); // 25.03.2023
    const inputDate = new Date(inputString.split('.').reverse().join('.')); // 2023.03.25

    const assertDate = new Date(new Date().setDate(new Date().getDate() + days));
    expect(inputDate.toLocaleDateString()).to.eql(assertDate.toLocaleDateString());
  });
};

export const selectTimestamp = (timestamp) => {
  cy.get(`[data-timestamp="${timestamp}"]`).then(($elements) => {
    if ($elements.length === 2) {
      cy.wrap($elements[1]).click();
    } else {
      cy.wrap($elements[0]).click();
    }
  });
};

export const ariaLabelSelector = () => {
  const date = new Date();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  const selector = `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  return selector;
};
