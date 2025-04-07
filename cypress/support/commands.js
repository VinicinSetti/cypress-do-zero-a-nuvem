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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) => {
    cy.get('#firstName').type('Fulanoooooooooooooooooooooo', { delay: 0 })
    cy.get('#lastName').type('deeeeeeeeeeeeeeeeee Tal', { delay: 0 })
    cy.get('#email').type('fulanoooooooooooooo@ciclano.com', { delay: 0 })
    cy.get('textarea').type('Mensagem de teste', { delay: 0 })
    cy.get('button').click()
})