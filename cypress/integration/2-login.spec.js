describe('Login', () => {
  it('Should correctly log into the app', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder=E-mail]').type('meuteste1@teste.com');
    cy.get('input[placeholder=Senha]').type('minhaSenhaSecreta123');
    cy.get('button[type=submit]').click();
    cy.wait(5000);
    cy.url().should('equal', 'http://localhost:3000/home');
  });
});
