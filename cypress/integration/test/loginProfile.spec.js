// TODO fix and update spec

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

    static groupNameCheck() {
      // gchecks group name
      cy.get('.sc-fzqBZW').should('contain', "Welcome to Testing Group Mofo")
    }

    static monthModalCheck() {
      // Makes sure the modal is visible
      cy.get('AxheI').should('be.visible')
    }

    static goalsModalCheck() {
      // Makes sure its visible
      cy.get('.sc-AxjAm').should('be.visible')
    }

    static completedGoal() {
      // Checks the "Log Your Completed Goal!" text
      cy.get('.sc-AxjAm > h2').should('contain', "Log Your Completed Goal!")
    }

    static goalDropdown() {
      // Clicks on the goals dropdown
      cy.get('[name="goalSelect"]').click()
    }
  }

  describe('loginProfile',() => {
    it('checks logged in profile',() => {
      basepage.visit()
      basepage.login()
      basepage.clickGroup()
      basepage.groupNameCheck()
      basepage.monthModalCheck()
      basepage.goalsModalCheck()
      basepage.completedGoal()
      basepage.goalDropdown()
    })
  })

