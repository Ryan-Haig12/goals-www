describe('takes screenshots', () => {
    it('gets the URL', () => {
        cy.visit("http://localhost:3000/")

    })

    it('full page screenshot', () => {
        cy.screenshot({ capture: 'fullPage' })
    })

    it('single element screenshot', () => {
        cy.get('#welcomeText').screenshot()

        cy.get('#loginButton').screenshot()
  })
})