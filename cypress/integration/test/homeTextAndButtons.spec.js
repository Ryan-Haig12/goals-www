// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  class basepage {
    static loadPage() {
      // cy.visit("http://goals-www.herokuapp.com/") // This opens the URL
      cy.visit("http://localhost:3000/") // This opens the URL
    }

    static verifyText() {
      // verifys text on the homepage
      cy.get('#loginHeader').should('contain', 'Login')
      cy.get('#welcomeText').should('contain', 'Welcome to Goals!')
      cy.get('#description').should('contain', 'In this game, you can team up and face off against your friends to use competition as motivation to improve your life one goal at a time')
    }

    static verifyButtons() {
      // Verifys buttons on the homepage
      cy.get('#loginButton').should('be.visible') // Verifys the login button
      cy.get('#userRedirect').should('be.visible') // Verifys the "Need to Create A User" button
    }
  }

describe('functions', () => {
  it('tests the homepage', () => {
    basepage.loadPage()
    basepage.verifyText()
    basepage.verifyButtons()
  })
})
  