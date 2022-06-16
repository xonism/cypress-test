export {}

declare global {
  interface Window {
    App: any
  }

  namespace Cypress {
    interface Chainable<Subject> {
      dataTest(value: string): Chainable<Element>
      breadcrumbContains(value: string): Chainable<Element>
      urlContains(value: string): Chainable<Element>
      assertTabIsActive(tabName: string): Chainable<Element>
      getButtonWithText(buttonText: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('dataTest', (value) => {
  cy.get(`[data-test="${value}"]`)
})

Cypress.Commands.add('breadcrumbContains', (value) => {
  cy.get('.ant-breadcrumb')
    .should('be.visible')
    .and('contain', value)
})

Cypress.Commands.add('urlContains', (value) => {
  cy.url()
    .should('contain', value)
})

Cypress.Commands.add('assertTabIsActive', (tabName) => {
  cy.contains('.ant-tabs-tab', tabName)
    .should('be.visible')
    .and('have.class', 'ant-tabs-tab-active')
})

Cypress.Commands.add('getButtonWithText', (buttonText) => {
  cy.contains('button', buttonText)
    .should('be.visible')
})
