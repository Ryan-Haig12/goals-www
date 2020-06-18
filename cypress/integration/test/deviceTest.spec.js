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
}

class devices extends basepage {
  static iphone6() {
      cy.viewport("iphone-6")
            cy.visit("http://localhost:3000/")
            cy.wait(3000)
  }

  static ipad() {
    cy.viewport("ipad-mini")
          cy.visit("http://localhost:3000/")
          cy.wait(3000)
  }

  static iphone() {
    // screensize "414 x 896"
    cy.viewport("iphone-xr")
    cy.visit("http://localhost:3000/")
    cy.wait(3000)
  }

  static mac() {
    // screensize "1440 x 900"
    cy.viewport("macbook-15")
    cy.visit("http://localhost:3000/")
    cy.wait(3000)
  }
}



describe('devices', () => {
  it('tests device screen sizes', () => {
    basepage.visit()
    devices.iphone6()
    devices.ipad()
    devices.iphone()
    devices.ipad()
    devices.mac()
  })
})
