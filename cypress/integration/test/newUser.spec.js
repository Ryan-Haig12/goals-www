/// <reference types="cypress" />
// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  describe('new user',function() {
      it('makes a new user',function() {

        // Opens the site
        cy.visit("http://localhost:3000/")

        // Clicks on "Create a User" button
        cy.get('.btn-primary').click()

        // Creates a new user
        cy.get('[type="name"]').type("newUser") // inserts name into the "Name" field
        cy.get('[type="email"]').type('randomEmail') // Inserts email into the "Email" field
        cy.get('[name="password"]').type("password") // Inserts password into the "password" field
        cy.get('[name="password2"]').type("password") // Inserts password into the "Confirm Password" field
        cy.get('.sc-AxjAm > .btn').click() // Clicks on the submit button
        //cy.get('.sc-AxhCb') // gets this error "Email newUser@apple.com already exists"

      })
  })