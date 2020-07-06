// TODO, need to add in actions for each modal.

// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  class basepage {
    static visit() {
      cy.visit("http://localhost:3000/")
    }

    static login() {
      // Logging the user in
      cy.login('email', 'password')
    }

    static clickGroup() {
      // Clicks on the group
      cy.get(':nth-child(1) > #userGroup').click()
    }
  }




  describe('loginProfile',() => {
    it('checks logged in profile',() => {
      basepage.visit()
      basepage.login()
    })
  })

