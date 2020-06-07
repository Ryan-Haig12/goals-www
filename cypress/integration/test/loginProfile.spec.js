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
        cy.login('email', 'password')
      })

      it('Clicks on "Testing Group Mofo"', () => {
        // Clicks on the group
        cy.get(':nth-child(1) > #userGroup').click()
      })

      it('Checks group name', () => {
        // gchecks group name
        cy.get('.sc-fzqBZW').should('contain', "Welcome to Testing Group Mofo")
      })

      it('Checks month standings modal', () => {
        // Makes sure the modal is visible
        cy.get('AxheI').should('be.visible')
      })
      
      it('Checks the goal modal', () => {
        // Makes sure its visible
        cy.get('.sc-AxjAm').should('be.visible')

        // Checks the "Log Your Completed Goal!" text
        cy.get('.sc-AxjAm > h2').should('contain', "Log Your Completed Goal!")

        // Clicks on the goals dropdown
        cy.get('[name="goalSelect"]').click()
      })
  })

