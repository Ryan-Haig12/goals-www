/// <reference types="cypress" />

import { getKey } from "apollo-link/lib/linkUtils"

// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  describe('Getting the URL', () => {
    it('gets the URL', () => {
      cy.visit("http://localhost:3000/")
    })
  })

  describe('Devices', () => {
      it('iPhone-6', () => {
          // screensize "375 x 667"
          cy.viewport("iphone-6")
          cy.visit("http://localhost:3000/")
          cy.wait(3000)
      })

      it('iPad mini', () => {
      // screensize "768 x 1024"
        cy.viewport("ipad-mini")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })

      it('iPhone', () => {
        // screensize "414 x 896"
        cy.viewport("iphone-xr")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })

      it('mac', () => {
      // screensize "1440 x 900"
        cy.viewport("macbook-15")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })
      })
