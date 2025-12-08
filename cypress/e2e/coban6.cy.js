describe('Context Menu - Chuột phải', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/context-menu')
  })

  it('Right click và kiểm tra alert', () => {
    // Bắt event alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You selected a context menu')
    })

    // Thực hiện right click vào vùng có id 'hot-spot'
    cy.get('#hot-spot').rightclick()
  })
})
