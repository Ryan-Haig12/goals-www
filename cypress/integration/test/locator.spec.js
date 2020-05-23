/// <reference types="cypress" />
// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })
  describe('Locating Elements',function() {
    it('verify types of locators',function() {
        // cy.visit("http://goals-www.herokuapp.com/") // This opens the URL
        cy.visit("http://localhost:3000/") // This opens the URL
        cy.get('[type="email"]').type("michaeldreesen90@gmail.com") // Types the email into the "email" field
        // Types the password into the "password" field
        cy.get('[type="password"]').type("password")
        cy.wait(3000)
        cy.get("[type='submit']").click() // Clicks on the "Submit" button
        cy.wait(2000)
        cy.get('.btn').click() // Clicks on "Go To Group Page" button
        cy.wait(2000)
        cy.get('.sc-fzoLag > :nth-child(1)').click() // Clicks on the "Home" button on the user's page
        cy.wait(2000)
        cy.get('.sc-fzoLag > :nth-child(3)').click() // Clicks on the "Create group" button
        cy.wait(2000)

        // Profile messes up here, Patron gets an error going to this page
        /*cy.get('.sc-fzoLag > :nth-child(2)').click() // Clicks on "Profile" button in the header
        cy.wait(2000)*/

        cy.get('.sc-fzqNJr').click() // Logs the User out
        cy.wait(2000)
        cy.get('.btn-primary').click() // Clicks "Need to create a user" button
        cy.wait(2000)

        // Creates a new user
        cy.get('[type="name"]').type("newUser") // inserts name into the "Name" field
        cy.get('[type="email"]').type("newUser@apple.com") // Inserts email into the "Email" field
        cy.get('[name="password"]').type("password") // Inserts password into the "password" field
        cy.get('[name="password2"]').type("password") // Inserts password into the "Confirm Password" field
        cy.get('.sc-AxjAm > .btn').click() // Clicks on the submit button
        cy.get('.sc-AxhCb') // gets this error "Email newUser@apple.com already exists"

        // Makes a group
        cy.get('.btn').click() // Clicks on create a group button

        // Creating random emails
        // cy.get([type="name"]).type("")
    })
  })