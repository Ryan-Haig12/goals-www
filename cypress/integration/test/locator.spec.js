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
        cy.get('[type="email"]').type("michaeldreesen90@gmail.com(opens in new tab)") // Types the email into the "email" field
        // Types the password into the "password" field
        cy.get('[type="password"]').type("password")
        cy.wait(3000)
        cy.get("[type='submit']").click() // Clicks on the "Submit" button
        cy.wait(2000)
        cy.get(':nth-child(1) > .sc-AxgMl').click() // Clicks on "Go To Group Page" button
        cy.wait(2000)
        cy.get('.sc-fzqARJ > :nth-child(3)').click() // Clicks on the "Home" button on the user's page
        cy.wait(2000)
        cy.get(':nth-child(1) > .sc-AxgMl').click() // Clicks on "Go To Group Page" button
        cy.wait(2000)
        cy.get('.sc-fzqARJ > :nth-child(2)').click() // Clicks on the "Create group" button
        cy.wait(2000)
        /*
        // It messes up here, need to figure this out
        cy.get('.sc-AxirZ').type("`${groupName}, { parseSpecialCharSequences: false }`") // Should put characters into the "Group Name" field
        cy.wait(2000) */
        // This will manually put in a group name and submit the form
        /* cy.get('.sc-AxirZ').type("groupName1") // Puts characters into the "group name" field
        cy.wait(2000) 
        cy.get('.sc-AxiKw').click() //  Clicks the "Submit" button on the new group name */
        cy.get('.sc-fzqARJ > :nth-child(1)').click() // Clicks on "Profile" button in the header
        cy.wait(2000)
        cy.get('.sc-fznWqX').click() // Logs the User out
        cy.wait(2000)
        cy.get('.sc-fzoXWK').click() // Clicks "Need to create a user" button
        cy.wait(2000)
        // Creating random emails
        // cy.get([type="name"]).type("")
    })
  })
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
      cy.wait(3000)
      cy.get(':nth-child(1) > .sc-AxgMl').click() // Clicks on "Go To Group Page" button
      cy.wait(2000)
      cy.get('.sc-fzqARJ > :nth-child(3)').click() // Clicks on the "Home" button on the user's page
      cy.wait(2000)
      cy.get(':nth-child(1) > .sc-AxgMl').click() // Clicks on "Go To Group Page" button
      cy.wait(2000)
      cy.get('.sc-fzqARJ > :nth-child(2)').click() // Clicks on the "Create group" button
      cy.wait(2000)
      /*
      // It messes up here, need to figure this out
      cy.get('.sc-AxirZ').type("`${groupName}, { parseSpecialCharSequences: false }`") // Should put characters into the "Group Name" field
      cy.wait(2000) */
      // This will manually put in a group name and submit the form
      /* cy.get('.sc-AxirZ').type("groupName1") // Puts characters into the "group name" field
      cy.wait(2000) 
      cy.get('.sc-AxiKw').click() //  Clicks the "Submit" button on the new group name */
      cy.get('.sc-fzqARJ > :nth-child(1)').click() // Clicks on "Profile" button in the header
      cy.wait(2000)
      cy.get('.sc-fznWqX').click() // Logs the User out
      cy.wait(2000)
      cy.get('.sc-fzoXWK').click() // Clicks "Need to create a user" button
      cy.wait(2000)
      // Creating random emails
      // cy.get([type="name"]).type("")
  })
})
