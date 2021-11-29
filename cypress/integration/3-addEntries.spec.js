describe('addEntries', () => {
  it('Should create new entries successfully', () => {
    cy.login('meuteste1@teste.com', 'minhaSenhaSecreta123');
    cy.wait(5000);

    cy.visit('http:///localhost:3000/home');
    cy.contains('Olá').should('be.visible');

    cy.get('button[type=button]').contains('entrada').click();
    cy.get('input[placeholder=Valor]').type('2000');
    cy.get('input[placeholder=Descrição]').type('Salário');

    cy.get('button[type=submit]').click();
    cy.wait(5000);
    cy.url().should('equal', 'http://localhost:3000/home');

    cy.contains('saída').click();
    cy.get('input[placeholder=Valor]').type('500');
    cy.get('input[placeholder=Descrição]').type('Contas');

    cy.get('button[type=submit]').click();
    cy.wait(5000);
    cy.url().should('equal', 'http://localhost:3000/home');
  });
});
