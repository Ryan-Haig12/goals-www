/// <reference types="cypress" />

import { getKey } from "apollo-link/lib/linkUtils"

// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  describe('Getting the URL', () => {
      it('Fetches the URL', () => {
        cy.visit("http://localhost:3000/")
      })

      it('Logs the user in', () => {
        // Logging the user in
        cy.get('[type="email"]').type("michaeldreesen90@gmail.com")
        cy.get('[type="password"]').type("password")
        cy.get("[type='submit']").click()
      })
  })

