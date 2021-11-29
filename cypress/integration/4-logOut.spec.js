describe('logOut', () => {
  it('Should log out successfully', () => {
    cy.login('meuteste1@teste.com', 'minhaSenhaSecreta123');
    cy.wait(3000);

    cy.visit('http:///localhost:3000/home');
    cy.contains('Olá').should('be.visible');

    cy.get('#out').click();
    cy.wait(3000);
    cy.contains('Sim!').click();

    cy.wait(5000);
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
