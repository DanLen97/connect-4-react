describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://danlen97.github.io/connect-4-react/');

    cy.url().should('include', '/commands/actions');
  })
})