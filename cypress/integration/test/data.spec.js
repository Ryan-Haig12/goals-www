describe('Data', () => {
    it('write file to json', () => {
        cy.writeFile('log.json', { name: 'newName', age: 210 })
    })

    it('write data to txt file', () => {
        cy.writeFile('log.txt', 'hello world' )
    })

    it('reads the log.js file', () => {
        cy.readFile('log.json')
        .its('age')
        .should('eq', 210)
    })

    it('reads the txt.js file', () => {
        cy.readFile('log.txt')
        .should('eq', 'hello world')
    })
})
