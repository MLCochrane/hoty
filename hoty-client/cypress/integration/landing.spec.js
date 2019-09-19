describe('User forms', () => {
  beforeEach(() => {
    cy.visit('localhost:3001');
  });

  it('displays account buttons', () => {
    cy.get('button').contains('Register');
    cy.get('button').contains('Login');
  });

  it('displays register form on click', () => {
    cy.get('button').contains('Register').click();
    cy.get('form').get('label')
      .should(($el) => {
        expect($el).to.have.length(5);
        const labels = $el.map((i, el) => Cypress.$(el).text().replace(/\u00a0/g, ' '));

        expect(labels.get()).to.deep.eq([
          'First Name',
          'Last Name',
          'Username',
          'Email *',
          'Password *',
        ]);
      });

    cy.get('form').get('input')
      .should(($el) => {
        expect($el).to.have.length(5);
        const labels = $el.map((i, el) => Cypress.$(el).attr('name'));

        expect(labels.get()).to.deep.eq([
          'firstName',
          'lastName',
          'username',
          'email',
          'password',
        ]);
      });

    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('button').contains('Sign in');
  });

  it('displays login form on click', () => {
    cy.get('button').contains('Login').click();
    cy.get('form').get('label').contains('Email');
    cy.get('form').get('label').contains('Password');
    cy.get('button').contains('Create one');
  });

  it('switches forms on caption click', () => {
    cy.get('button').contains('Login').click();
    cy.get('form').should('have.class', 'login');
    cy.get('button').contains('Create one').click();
    cy.get('form').should('have.class', 'register');
    cy.get('button').contains('Sign in').click();
    cy.get('form').should('have.class', 'login');
  });
});

describe('Register fields', () => {
  beforeEach(() => {
    cy.visit('localhost:3001');
    cy.get('button').contains('Register').click();
  });

  it('displays helper messages', () => {
    cy.get('input[name="firstName"]').type('P');
    cy.get('#register-firstName-name-helper-text').should('be.visible');
    cy.get('input[name="firstName"]').type('aul');
    cy.get('#register-firstName-name-helper-text').should('not.be.visible');

    cy.get('input[name="lastName"]').type('F');
    cy.get('#register-lastName-name-helper-text').should('be.visible');
    cy.get('input[name="lastName"]').type('oreman');
    cy.get('#register-lastName-name-helper-text').should('not.be.visible');

    cy.get('input[name="username"]').type('P_da');
    cy.get('#register-username-helper-text').should('not.be.visible');
    cy.get('input[name="username"]').type(' f');
    cy.get('#register-username-helper-text').should('be.visible');
    cy.get('input[name="username"]').type('{backspace}{backspace}');
    cy.get('#register-username-helper-text').should('not.be.visible');
    cy.get('input[name="username"]').type('$');
    cy.get('#register-username-helper-text').should('be.visible');
    cy.get('input[name="username"]').type('{backspace}');

    cy.get('input[name="username"]').type('P_da');
    cy.get('#register-username-helper-text').should('not.be.visible');
    cy.get('input[name="username"]').type(' f');
    cy.get('#register-username-helper-text').should('be.visible');
    cy.get('input[name="username"]').type('{backspace}{backspace}');
    cy.get('#register-username-helper-text').should('not.be.visible');
    cy.get('input[name="username"]').type('$');
    cy.get('#register-username-helper-text').should('be.visible');
    cy.get('input[name="username"]').type('{backspace}');
  });
});
