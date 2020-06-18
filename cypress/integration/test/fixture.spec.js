describe('Login with Fixtures data', () => {
    it('should try to login', () => {
        cy.visit("http://localhost:3000/")

        cy.fixture('user').then(user => {
            const username = user.username
            const password = user.password

        cy.get('[type="email"]').type("michaeldreesen90@gmail.com")
        cy.get('[type="password"]').type("password")
        cy.get("[type='submit']").click()
        })
    })
})
