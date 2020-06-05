describe('keyboard press simulation', () => {
    it('should submit searchbox with pressing enter', () => {

        cy.visit("http://localhost:3000/")

        // Logging in
        cy.login('email', 'password')

    })
    it('clicls on the group name', () => {

    // Going to the group page
    cy.get('#userGroup').click()
        })

        it('goes to the message box to type something', () => {

            // Types text into the messagebox
            cy.get('.sc-fzozJi').type('this is some text {enter}')
    })
})