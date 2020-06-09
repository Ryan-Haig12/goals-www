/// <reference types="cypress" />

import { getKey } from "apollo-link/lib/linkUtils"

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


        // Enters Random Email, does not click the submit button, error should keep showing
        cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
        cy.get('[type="email"]').type("12345678901234567890@gmail.com").clear() // Abnormal email
        cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters

        // Types the password into the "password" field
        cy.get('[type="password"]').type("password")
        cy.get('[type="password"]').type("12345678901234567890123456789012345678901234567890").clear() // 50 Chars
        cy.get('[type="password"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Abnormal password

        // Creating random emails
        // cy.get([type="name"]).type("")
    })

    it('different email and password scenatios', () => {

        // Types email and password together, 50 chars scenario
        cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com") // 50 Chars
        cy.get('[type="password"]').type("12345678901234567890123456789012345678901234567890") // 50 Chars
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()

        // Special characters
        cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?") // Special characters
        cy.get('[type="password"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?") // Abnormal password
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()

    })

      it('Login form errors', () => {

        // Enter email, not password, error should show
        cy.get('[type="email"]').type("michaeldreesen90@gmail.com")
        cy.get("[type='submit']").click()
        .wait(2000)
        cy.get('.sc-AxhCb').should('be.visible') // Password is Required message
        cy.get('[type="email"]').clear()

        // Refreshes the page
        cy.visit("http://localhost:3000/")

        // Enter password, not email, error should show
        cy.get('[type="password"]').type("password")
        cy.get("[type='submit']").click()
        .wait(2000)
        cy.get('.sc-AxhCb').should('be.visible') // Email is required message
        cy.get('[type="email"]').clear()

      })
  })
  