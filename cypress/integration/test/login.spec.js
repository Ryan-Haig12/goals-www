class basepage {
    static loadHomePage() {
        cy.visit("http://localhost:3000/")
    }
    static wait(number) {
        cy.wait(number)
    }
}
class userCreds extends basepage {
    static randomEmail() {
        cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com").clear() // 50 Chars
        cy.get('[type="email"]').type("12345678901234567890@gmail.com").clear() // Abnormal email
        cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Special characters
    }
    static randomPassword() {
        cy.get('[type="password"]').type("password")
        cy.get('[type="password"]').type("12345678901234567890123456789012345678901234567890").clear() // 50 Chars
        cy.get('[type="password"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?").clear() // Abnormal password
    }
}
class regression extends basepage {
    static emailPasswordRegression() {
        // Types email and password together, 50 chars scenario
        cy.get('[type="email"]').type("1234567890123456789012345678901234567890@gmail.com") // 50 Chars
        cy.get('[type="password"]').type("12345678901234567890123456789012345678901234567890") // 50 Chars
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()
        // Special characters
        cy.get('[type="email"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?") // Special characters
        cy.get('[type="password"]').type("!@#$%^&*())(*&^%$#@!!@#$%^&*()<>?") // Abnormal password
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()
    }
}
class errors extends basepage {
    static errors() {
        // Enter email, not password, error should show
        cy.get('[type="email"]').type("michaeldreesen90@gmail.com")
        cy.get("[type='submit']").click()
        .wait(2000)
        cy.get('.sc-AxhCb').should('be.visible') // Password is Required message
        cy.get('[type="email"]').clear()
        // Refreshes the page
        cy.visit("http://localhost:3000/")
        // Enter password, not email, error should show
        cy.get('[type="password"]').type("password")
        cy.get("[type='submit']").click()
        .wait(2000)
        cy.get('.sc-AxhCb').should('be.visible') // Email is required message
        cy.get('[type="email"]').clear()
    }
}
describe('loginSpec', () => {
    it('loads up the loginSpec', () => {
        basepage.loadHomePage()
        basepage.wait(3000)
        userCreds.randomEmail()
        userCreds.randomPassword()
        regression.emailPasswordRegression()
        errors.errors()
    })
})