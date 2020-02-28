
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
  });
  it('login:success', () => {
    cy.get('#loginUsername').type(user.username);
    cy.get('#loginPassword').type(user.password);
    cy.get('#loginButton').click();
    cy.contains('logged in successfully');
  });
  it('home:logged', () => {
    cy.contains('You have logged in and therefore eligible to use advanced features.');
  });
});

describe('About', () => {
  it('about', () => {
    cy.visit('/about');
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
  it('calculate:fields', () => {
    cy.visit('/calculate');
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
  it('countries:heading', () => {
    cy.visit('/countries');
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
  it('dashboard:not logged', () => {
    cy.visit('/dashboard');
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
  it('dishy:unlogged', () => {
    cy.visit('/dishy');
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
    cy.get('#notification').should('exist');
    cy.get('#newCarbName').should('exist').should('be.visible');
    cy.get('#saveCarb').should('exist').should('be.visible');
    cy.get('#newCarbName').type(dishComponents.carb.name);
    cy.get('#saveCarb').click();
    cy.get('#newCarbName').should('be.empty');
    cy.contains(`New carb saved: ${dishComponents.carb.name}`);
  });
  it('dishy:additions:protein', () => {
    cy.get('#componentSelectProtein').click();
    cy.get('#notification').should('exist');
    cy.get('#newProteinName').should('exist').should('be.visible');
    cy.get('#saveProtein').should('exist').should('be.visible');
    cy.get('#newProteinName').type(dishComponents.protein.name);
    cy.get('#saveProtein').click();
    cy.get('#newProteinName').should('be.empty');
    cy.contains(`New protein saved: ${dishComponents.protein.name}`);
  });
  it('dishy:additions:spice', () => {
    cy.get('#componentSelectSpice').click();
    cy.get('#notification').should('exist');
    cy.get('#newSpiceName').should('exist').should('be.visible');
    cy.get('#saveSpice').should('exist').should('be.visible');
    cy.get('#newSpiceName').type(dishComponents.spice.name);
    cy.get('#saveSpice').click();
    cy.get('#newSpiceName').should('be.empty');
    cy.contains(`New spice saved: ${dishComponents.spice.name}`);
  });
  it('dishy:additions:method', () => {
    cy.get('#componentSelectMethod').click();
    cy.get('#notification').should('exist');
    cy.get('#newMethodName').should('exist').should('be.visible');
    cy.get('#saveMethod').should('exist').should('be.visible');
    cy.get('#newMethodName').type(dishComponents.method.name);
    cy.get('#saveMethod').click();
    cy.get('#newMethodName').should('be.empty');
    cy.contains(`New method saved: ${dishComponents.method.name}`);
  });
  it('dishy:additions:dish', () => {});
});