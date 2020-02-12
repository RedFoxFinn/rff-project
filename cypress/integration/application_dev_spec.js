
before(() => {
  cy.clearLocalStorage();
});

describe('Home, Register & Login -pages', () => {
  it('home', () => {
    cy.visit('/');
    cy.contains('If you want to use these advanced features, please log in.');
  });
  it('/register', () => {
    cy.visit('/register');
    cy.contains('register >');
  });
  it('/login', () => {
    cy.visit('/login');
    cy.contains('login >');
    cy.contains('register >');
  });
});

describe('About', () => {
  before(() => {
    cy.visit('/about');
  });
  it('about', () => {
    cy.contains('Repository:');
    cy.contains('Used technology stack:');
    cy.contains('Frontend');
    cy.contains('Backend');
    cy.contains('Database & API');
    cy.contains('Testing');
    cy.contains('Development tools');
    cy.contains('Used color palette:');
    cy.contains('Other styles:');
  });
});

describe('Calculate', () => {
  before(() => {
    cy.visit('/calculate');
  });
  it('calculate:fields', () => {
    cy.contains('Addition');
    cy.contains('Multiplication');
    cy.contains('Exponentiation');
    cy.contains('Cube');
    cy.contains('Subtraction');
    cy.contains('Division');
    cy.contains('Square root');
    cy.contains('Cube root');
  });
});

describe('OpenCountry', () => {
  before(() => {
    cy.visit('/countries');
  });
  it('countries:heading', () => {
    cy.contains('Data for');
    cy.contains('countries found');
  });
  it('countries:list:details', () => {
    cy.contains('Capital:');
    cy.contains('Region:');
    cy.contains('Subregion:');
    cy.contains('Population:');
    cy.contains('ISO 3166:');
  });
});

describe('Dashboard', () => {
  before(() => {
    cy.visit('/dashboard');
  });
  it('/dashboard', () => {
    cy.contains('Available applications:');
    cy.contains('Statistics:');
    cy.contains('Calculate');
    cy.contains('Dishy');
    cy.contains('OpenCountry');
  });
});

describe('Dishy', () => {
  before(() => {
    cy.visit('/dishy');
  });
  it('/dishy', () => {
    cy.contains('Suggested:');
    cy.contains('Dishes:');
    cy.contains('Carbs:');
    cy.contains('Proteins:');
    cy.contains('Spices:');
    cy.contains('Cooking methods:');
  });
});