export const assertTechStack = (department) => {
  const expectedTechCounts = {
    Frontend: 6,
    Backend: 5,
    Infrastructure: 4,
    Design: 5,
  };

  const expectedTechCount = expectedTechCounts[department];
  const lowerCaseDepartment = department.toLowerCase();

  cy.contains(department).click();
  cy.get(`[data-tech="${lowerCaseDepartment}"]`)
    .its('length')
    .then((length) => {
      cy.log(`${department}: ${length} technologies`);
      expect(length).eq(expectedTechCount);
      // assert.equal(length, expectedTechCount);
      // cy.wrap(length).should('eq', expectedTechCount);
    });
};
