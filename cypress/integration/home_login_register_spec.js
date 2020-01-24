
describe('Home page', () => {
  it('home:not logged', () => {
    cy.visit('/');
    cy.contains('If you want to use these advanced features, please log in.');
  });
  it('register', () => {
    cy.visit('/register');
    cy.get('#regUsername').type(``);
    cy.get('#regPassword').type(``);
    cy.get('#regConfirm').type(``);
    cy.get('#regButton').click();
    cy.contains(` registered`);
  });
  it('login', () => {
    cy.contains('login').click();
    cy.get('#loginUsername').type(``);
    cy.get('#loginPassword').type(``);
    cy.get('#loginButton').click();
    cy.contains('logged in successfully');
  });
  it('home:logged', () => {});
});