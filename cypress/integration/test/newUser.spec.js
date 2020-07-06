// TODO - Need to research and figure out how to add in a new user email, maybe using the $ method?
// TODO - Need to reasearch how to get rid of the new user from the db

// This block is to make sure this .js file works
describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
  })

  class basepage {
    static visit() {
       // Opens the site
       cy.visit("http://localhost:3000/")
    }

    static clickCreateUser() {
      // Clicks on "Create a User" button
      cy.get('.btn-primary').click()
    }

    static createNewUser() {
      // Creates a new user
      cy.get('[type="name"]').type("newUser") // inserts name into the "Name" field
      cy.get('[type="email"]').type('randomEmail@email.comb') // Inserts email into the "Email" field
      cy.get('[name="password"]').type("password") // Inserts password into the "password" field
      cy.get('[name="password2"]').type("password") // Inserts password into the "Confirm Password" field
      //cy.get('.sc-AxjAm > .btn').click() // Clicks on the submit button
      //cy.get('.sc-AxhCb') // gets this error "Email newUser@apple.com already exists"
    }

    static clickSubmit() {
      // clicks the submit button
        cy.get('.sc-AxjAm > .btn').click()
        // Should get the "Email randomEmail@email.comb already exists"
        cy.get('.sc-AxhCb').should('be.visible')
    }
  }
  
describe('newUser',() => {
  it('looks at new user page',() => {
    basepage.visit()
    basepage.clickCreateUser()
    basepage.createNewUser()
    basepage.clickSubmit()
  })
})
