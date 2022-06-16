export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      typeAndAssertValue(typeValue: string | number, assertValue?: string | number): Chainable<Element>
      /** Additionally asserts that pulse animation in order details is not visible */
      typeAndAssertValueWithPulseCheck(typeValue: string | number, assertValue?: string | number): Chainable<Element>
      assertInputIsEmpty(inputDataTest: string): Chainable<Element>
      assertInputIsNotEmpty(inputDataTest: string): Chainable<Element>
      getExplainMessageUnderInputField(inputFieldDataTest: string): Chainable<Element>
      /** Should be chained off `getExplainMessageUnderInputField` */
      assertText(expectedText: string): Chainable<Element>
      assertInputContains(inputDataTest: string, value: string | number): Chainable<Element>
    }
  }
}

Cypress.Commands.add('typeAndAssertValue', { prevSubject: true }, (subject, typeValue, assertValue) => {
  const valueToHave = assertValue ? assertValue : typeValue
  
  cy.wrap(subject)
    .should('be.enabled')
    .focus()
    .clear()

  cy.wrap(subject)
    .should('be.empty')
    .wait(1000) // ensures cypress correctly types value
    .type(typeValue.toString())
    .should('have.value', valueToHave)
})

Cypress.Commands.add('typeAndAssertValueWithPulseCheck', { prevSubject: true }, (subject, typeValue, assertValue) => {
  const valueToHave = assertValue ? assertValue : typeValue
  
  cy.wrap(subject)
    .should('be.enabled')
    .focus()
    .clear()

  cy.wrap(subject)
    .should('be.empty')
    .wait(1000) // ensures cypress correctly types value
    .type(typeValue.toString())
    .should('have.value', valueToHave)

  cy.get('.dot-pulse')
    .should('not.be.visible')
})

Cypress.Commands.add('assertInputIsEmpty', (inputDataTest) => {
  cy.dataTest(inputDataTest)
    .should('be.visible')
    .invoke('val')
    .should('be.empty')
})

Cypress.Commands.add('assertInputIsNotEmpty', (inputDataTest) => {
  cy.dataTest(inputDataTest)
    .should('be.visible')
    .invoke('val')
    .should('not.be.empty')
})

Cypress.Commands.add('assertInputContains', (inputDataTest, value) => {
  cy.dataTest(inputDataTest)
    .invoke('val')
    .should('contain', value)
})

Cypress.Commands.add('getExplainMessageUnderInputField', (inputFieldDataTest) => {
  cy.dataTest(inputFieldDataTest)
    .should('be.visible')
    .parentsUntil('.ant-col')
    .last()
    .find('.ant-form-explain')
})

Cypress.Commands.add('assertText', { prevSubject: true }, (subject, expectedText) => {
  cy.wrap(subject)
    .invoke('text')
    .then((text) => {
      expect( text.toLowerCase() ).to.eq(expectedText)
    })
})
