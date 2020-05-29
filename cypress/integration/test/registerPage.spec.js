/// <reference types="cypress" />

import { getKey } from "apollo-link/lib/linkUtils"

// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  describe('registerPage', () => {
      it('Fetches the URL', () => {
          cy.visit("http://localhost:3000/")
      })

      it('clicks the userRedirect button', () => {
        cy.get('#userRedirect').click()
      })

      it('completes the name field', () => {
        // Enters random names
        cy.get('[type="name"]').type("name") // Around regular name length
        cy.get('[type="name"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
        cy.get('[type="name"]').type("12345678901234567890lkjwefojsdlsndvogksjdf").clear() // Abnormal name
        cy.get('[type="name"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters
      })

      it('completes the email field', () => {
        // Enters random emails
        cy.get('[type="email"]').type("newmemail@email.com") // around normal email length
        cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
        cy.get('[type="email"]').type("12345678901234567890@gmail.com").clear() // Abnormal email
        cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters
      })

  })