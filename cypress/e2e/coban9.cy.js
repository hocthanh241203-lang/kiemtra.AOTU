describe('Dynamic Controls - Enable/Disable input', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/dynamic-controls')
  })

  it('Enable và Disable input', () => {
    // 1️⃣ Click nút "Enable"
    cy.contains('button', 'Enable').click()

    // 2️⃣ Kiểm tra input được enable
    cy.get('input[type="text"]').should('be.enabled')

    // 3️⃣ Click nút "Disable"
    cy.contains('button', 'Disable').click()

    // 4️⃣ Kiểm tra input được disable lại
    cy.get('input[type="text"]').should('be.disabled')
  })
})
