describe('Horizontal Slider - Kéo slider', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/horizontal-slider')
  })

  it('Kéo slider lên giá trị 3', () => {
    // Lấy slider
    cy.get('input[type="range"]')
      .invoke('val', 3)          // gán giá trị 3
      .trigger('change')         // kích hoạt event change

    // Kiểm tra giá trị hiển thị
    cy.get('#range').should('have.text', '3')
  })
})
