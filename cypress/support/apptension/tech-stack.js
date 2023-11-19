const expectedTechCounts = {
  Frontend: 6,
  Backend: 5,
  Infrastructure: 4,
  Design: 5,
};

const getDepartmentTechCount = (department) => {
  const lowerCaseDepartment = department.toLowerCase();
  return cy.get(`[data-tech="${lowerCaseDepartment}"]`).its('length');
};

export const clickOnDepartment = (department) => {
  cy.contains(department).click();
};

export const assertTechStack = (department) => {
  const expectedTechCount = expectedTechCounts[department];

  getDepartmentTechCount(department).then(($length) => {
    cy.log(`${department}: ${$length} technologies`);
    expect($length).eq(expectedTechCount);
    // assert.equal($length, expectedTechCount);
    // cy.wrap($length).should('eq', expectedTechCount);
  });
};
