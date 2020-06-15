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

class iphone6 extends basepage {
  static iphone6() {
      cy.viewport("iphone-6")
            cy.visit("http://localhost:3000/")
            cy.wait(3000)
  }
}

class ipad extends iphone6 {
  static ipad() {
  cy.viewport("ipad-mini")
        cy.visit("http://localhost:3000/")
        cy.wait(3000)
  }
}

class iphone extends ipad {
  static iphone() {
     // screensize "414 x 896"
     cy.viewport("iphone-xr")
     cy.visit("http://localhost:3000/")
     cy.wait(3000)
  }
}

class mac extends ipad {
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
    iphone6.iphone6()
    ipad.ipad()
    iphone.iphone()
    ipad.ipad()
    mac.mac()
  })
})
