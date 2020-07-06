import { isMainThread } from "worker_threads"

    class basepage {
        static visit() {
            cy.visit("http://localhost:3000/")
        }

        static login() {
            // Logging in
            cy.login('email', 'password')
        }

        static userGroup() {
            // Going to the group page
            cy.get('#userGroup').click()
        }

        static messageBox() {
            // Types text into the messagebox
            cy.get('.sc-fzozJi').type('this is some text {enter}')
        }
    }

describe('keyboard',() => {
    it('uses the messageBox',() => {
        basepage.visit()
        basepage.login()
        basepage.userGroup()
        basepage.messageBox()
    })
})
