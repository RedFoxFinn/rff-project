
let user;
let dishComponents;

before(async () => {
  const date = await Date.now();
  user = {
    username: `user:${date/100000}`,
    password: `pw:${date/10000}`,
    altPassword: `pw:${date/10000*2}`
  };
  dishComponents = {
    carb: {
      name: `carb:${date/1000}`,
      type: 'carb'
    },
    protein: {
      name: `protein:${date/1000}`,
      type: 'protein'
    },
    spice: {
      name: `spice:${date/1000}`,
      type: 'spice'
    },
    method: {
      name: `method:${date/1000}`
    }
  };
});

describe('Home, Register, Login', () => {
  it('home:not logged', () => {
    cy.visit('/');
    cy.contains('If you want to use these advanced features, please log in.');
  });
  it('register:fail:password mismatch', () => {
    cy.visit('/register');
    cy.get('#regUsername').type(user.username);
    cy.get('#regPassword').type(user.password);
    cy.get('#regConfirm').type(user.altPassword);
    cy.get('#regButton').click();
    cy.contains('passwords do not match');
  });
  it('register:success', () => {
    cy.get('#regUsername').type(user.username);
    cy.get('#regPassword').type(user.password);
    cy.get('#regConfirm').type(user.password);
    cy.get('#regButton').click();
    cy.contains(`${user.username} registered`);
  });
  it('register:fail:username already in use', () => {
    cy.get('#regUsername').type(user.username);
    cy.get('#regPassword').type(user.password);
    cy.get('#regConfirm').type(user.password);
    cy.get('#regButton').click();
    cy.contains(`username ${user.username} is already in use`);
  });
  it('login:fail', () => {
    cy.visit('/login');
    cy.get('#loginUsername').type(user.username);
    cy.get('#loginPassword').type(user.altPassword);
    cy.get('#loginButton').click();
    cy.contains('invalid username or password');
    cy.location('pathname').should('eq','/login');
  });
  it('login:success', () => {
    cy.get('#loginUsername').type(user.username);
    cy.get('#loginPassword').type(user.password);
    cy.get('#loginButton').click();
    cy.contains('logged in successfully');
    cy.location('pathname').should('eq','/');
  });
  it('home:logged', () => {
    cy.contains('You have logged in and therefore eligible to use advanced features.');
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
  it('dashboard:not logged', () => {
    cy.contains('Available applications:');
    cy.contains('Statistics:');
    cy.contains('Calculate');
    cy.contains('Dishy');
    cy.contains('OpenCountry');
  });
  it('dashboard:logged', () => {
    cy.visit('/login');
    cy.get('#loginUsername').type(user.username);
    cy.get('#loginPassword').type(user.password);
    cy.get('#loginButton').click();
    cy.contains('logged in successfully');
    cy.location('pathname').should('eq','/');
    cy.visit('/dashboard');
    cy.contains('Available applications:');
    cy.contains('Statistics:');
    cy.contains('Calculate');
    cy.contains('Dishy');
    cy.contains('OpenCountry');
    cy.contains('Tasker');
    cy.contains('Transporter');
  });
});

describe('Dishy', () => {
  before(() => {
    cy.visit('/dishy');
  });
  it('dishy:unlogged', () => {
    cy.contains('Suggested:');
    cy.contains('Dishes:');
    cy.contains('Carbs:');
    cy.contains('Proteins:');
    cy.contains('Spices:');
    cy.contains('Cooking methods:');
  });
  it('dishy:logged', () => {
    cy.visit('/login');
    cy.get('#loginUsername').type(user.username);
    cy.get('#loginPassword').type(user.password);
    cy.get('#loginButton').click();
    cy.contains('logged in successfully');
    cy.location('pathname').should('eq','/');
    cy.visit('/dishy');
    cy.contains('Suggested:');
    cy.contains('Dishes:');
    cy.contains('Carbs:');
    cy.contains('Proteins:');
    cy.contains('Spices:');
    cy.contains('Cooking methods:');
    cy.contains('Add new...');
  });
  it('dishy:additions:carb', () => {
    cy.get('#componentSelectCarb').click();
    cy.get('#newCarbName').type(dishComponents.carb.name);
    cy.get('#saveCarb').click();
    cy.location('pathname').should('eq','/dishy');
    cy.contains(`New carb saved: ${dishComponents.carb.name}`);
    cy.get('#newCarbName').should('be.empty');
  });
  it('dishy:additions:protein', () => {
    cy.get('#componentSelectProtein').click();
    cy.get('#newProteinName').type(dishComponents.protein.name);
    cy.get('#saveProtein').click();
    cy.location('pathname').should('eq','/dishy');
    cy.contains(`New protein saved: ${dishComponents.protein.name}`);
    cy.get('#newProteinName').should('be.empty');
  });
  it('dishy:additions:spice', () => {});
  it('dishy:additions:method', () => {});
  it('dishy:additions:dish', () => {});
});