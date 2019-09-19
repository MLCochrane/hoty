describe('Dashboard page', () => {
  it('will only display if logged in', () => {
    cy.visit('localhost:3001/');
    cy.get('[data-cy="dashboard"]').should('not.exist');
    cy.get('[data-cy="header"]').should('not.exist');
    cy.get('[data-cy="landing"]');
    cy.login();
    cy.visit('localhost:3001/');
    cy.get('[data-cy="dashboard"]');
    cy.get('[data-cy="header"]');
    cy.get('[data-cy="landing"]').should('not.exist');
    cy.get('[data-cy="dashboard"]').contains('Dashboard');
  });
});
