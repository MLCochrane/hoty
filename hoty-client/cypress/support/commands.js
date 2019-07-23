// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.server();
  cy.route('POST', 'localhost:3000/users/login', 'fixture:login-res.json');
  cy.window().its('store').invoke('dispatch', {
    type: 'RECIEVE_TOKEN',
    payload: 'secret.jwt.token',
  });
  cy.route('GET', 'http://localhost:3000/users/me', 'fixture:user.json');
  // cy.request({
  //   url: 'localhost:3000/users/login',
  //   method: 'POST',
  //   body: {
  //     email: 'lukecochrane2@gmail.com',
  //     password: 'testing1',
  //   }
  // }).then((res) => {
  //   cy.window().its('store').invoke('dispatch', {
  //     'type': 'RECIEVE_TOKEN',
  //     'payload': res.body.token,
  //   });
  // });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
