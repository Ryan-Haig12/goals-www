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

    static userRedirect() {
      cy.get('#userRedirect').click()
    }
  }

  class textTests extends basepage {
    static nameField() {
      // Enters random names
      cy.get('[type="name"]').type("name") // Around regular name length
      cy.get('[type="name"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
      cy.get('[type="name"]').type("12345678901234567890lkjwefojsdlsndvogksjdf").clear() // Abnormal name
      cy.get('[type="name"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters
    }

    static emailField() {
      // Enters random emails
      cy.get('[type="email"]').type("newmemail@email.com") // around normal email length
      cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
      cy.get('[type="email"]').type("12345678901234567890@gmail.com").clear() // Abnormal email
      cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters
    }

    static passwordField() {
      // Enters the password into the password field
      cy.get('[name="password"]').type("password")
      cy.get('[name="password"]').type("12345678901234567890123456789012345678901234567890").clear() // 50 Chars
      cy.get('[name="password"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Abnormal password
    }

    static confrirmPasswordField() {
      // Enters the password into 
      cy.get('[name="password2"]').type("password")
      cy.get('[name="password2"]').type("12345678901234567890123456789012345678901234567890").clear() // 50 Chars
      cy.get('[name="password2"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Abnormal password
    }
  }

  class clearCookie extends textTests {
    static clearCookie() {
       // Clearing cookies
       cy.clearCookie('authId')
       // Clearing local storage
       cy.clearLocalStorage()
    }
  }

  class completeForm extends clearCookie {
    static completeForm() {
       // Enters name, email, password, and confirm password
       cy.get('[type="name"]').type("name") // Around regular name length
       cy.get('[type="email"]').type("newmemail@email.com") // around normal email length
       cy.get('[name="password"]').type("password")
       cy.get('[name="password2"]').type("password")
    }
  }

describe('registerPage', () => {
  it('checks the register page', () => {
    basepage.visit()
    basepage.userRedirect()
    textTests.nameField()
    textTests.emailField()
    textTests.passwordField()
    textTests.confrirmPasswordField()
    clearCookie.clearCookie()
    completeForm.completeForm()
  })
})
  