describe('takes screenshots', () => {
    it('gets the URL', () => {
        cy.visit("http://localhost:3000/")

    })

// Commenting this out so that it does not keep taking screenshots

   /*
    it('full page screenshot', () => {
        cy.screenshot({ capture: 'fullPage' })
    })

    it('single element screenshot', () => {
        cy.get('#welcomeText').screenshot()

        cy.get('#loginButton').screenshot()
  })
  */
})