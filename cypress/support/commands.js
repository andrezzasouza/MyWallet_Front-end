Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/');

  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.get('button[type=submit]').click();
});
