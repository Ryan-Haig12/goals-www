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
      it('720p', () => {
          // cy.viewport(1280, 720)
          cy.viewport("iphone-6")
          cy.visit("http://localhost:3000/")
          cy.wait(3000)
      })

      it('iPad mini', () => {
        cy.viewport("ipad-mini")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })

      it('iPhone', () => {
        cy.viewport("iphone-xr")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })

      it('mac', () => {

        cy.viewport("macbook-15")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
      })
      })