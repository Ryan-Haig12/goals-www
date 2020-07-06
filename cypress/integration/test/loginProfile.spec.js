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
      // Checks welcome to group name on the page
      cy.get('.sc-fzqBZW').should('contain', "Welcome to This is a testing group")
    }
  }

  class header extends basepage {
    static headerCheck() {
      // "Create Group" button in header
      cy.get('.sc-fzpjYC > :nth-child(3)').should('be.visible')
      // "Profile" button in header
      cy.get('.sc-fzpjYC > :nth-child(2)').should('be.visible')
      // "Home" button in header
      cy.get('.sc-fzpjYC > :nth-child(1)').should('be.visible')
      // "Logout" button in header
      cy.get('.sc-fzoLag').should('be.visible')
    }
  }

  class monthStandings extends header {
    static monthStandingCheck() {
      // Checks the overall modal to see if this is visible
      cy.get('#standingModal').should('be.visible')
      // Checks the h3 for the standing modal
      cy.get('#standingModal > h3').should('be.visible')
      // checks the "Go To Admin Options" button in the modal
      cy.get('#standingModal > div > :nth-child(1)').should('be.visible')
      // Checks the "Go To Finished Goal Report" button in the standings modal
      cy.get('#standingModal > div > :nth-child(1)').should('be.visible')
      // Checks the monthly leaders box
      cy.get('.sc-fzokOt').should('be.visible')
    }
  }

  class goalSelector extends monthStandings {
    static goalSelector() {
      // Makes sure its visible
      cy.get('#goalSelector').should('be.visible')
      // Checks the "Log Your Copleted Goal!" h2 in modal
      cy.get('#goalSelector > h2').should('be.visible')
      // Checks the goal dropdown selector 
      cy.get('[name="goalSelect"]').should('be.visible')
      // Checks the "Log Time Here" dropdown selector
      cy.get('[name="minutesLogged"]').should('be.visible')
      // Checks the "Submit" button for the completed goal modal
      cy.get('#finishGoal').should('be.visible')
    }
  }

  class messageBox extends goalSelector {
    static messageBox() {
      // Makes sure the messagebox is visible
      cy.get('#messageBox > :nth-child(1)').should('be.visible')
      // Checks the "Group Chat" header in the messagebox
      cy.get('.modal-title').should('be.visible')
      // Makes sure the input bar is visible
      cy.get('#messageInput').should('be.visible')
    }
  }


  describe('loginProfile',() => {
    it('checks logged in profile',() => {
      basepage.visit()
      basepage.login()
      basepage.clickGroup()
      basepage.groupNameCheck()
      header.headerCheck
      monthStandings.monthStandingCheck()
      goalSelector.goalSelector()
      messageBox.messageBox()
    })
  })

