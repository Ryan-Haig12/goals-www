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
      // Puts in email and password - DO NOT LOGIN
      cy.get('[type="email"]').type("michaeldreesen90@gmail.com(opens in new tab)") // Types the email into the "email" field
      // Types the password into the "password" field
      cy.get('[type="password"]').type("password")
      cy.wait(2000)
      // Create a user - DO NOT SUBMIT
      cy.get('.sc-fzoXWK').click() // Clicks on "create a user" button
      cy.get('[type="name"]').type("New User") // inserts name into "Name" field
      cy.get('[type="email"]').type("new@apple.com(opens in new tab)") // inserts email into "Email" field
      cy.get('[name="password"]').type("password") // inserts password into "password" field
      cy.get('[name="password2"]').type("password") // confirming password in "Confirm Password" field
      // Clicks on "Already Have A User" button
      cy.get('.sc-fzoXWK').click() // Clicks on "Already Have A User" button
      // cy.find('title')
  })
})
