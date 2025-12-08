describe('Dynamic Controls - Thêm/Xóa checkbox', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/dynamic-controls')
  })

  it('Xóa và thêm lại checkbox', () => {
    // 1️⃣ Click nút "Remove"
    cy.contains('button', 'Remove').click()

    // 2️⃣ Kiểm tra checkbox đã bị xóa
    cy.get('#checkbox').should('not.exist')

    // 3️⃣ Click nút "Add"
    cy.contains('button', 'Add').click()

    // 4️⃣ Kiểm tra checkbox đã xuất hiện lại
    cy.get('#checkbox').should('exist')
  })
})
