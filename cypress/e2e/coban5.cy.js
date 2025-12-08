describe('JS Dialogs - Cơ bản', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/js-dialogs')
  })

  it('Xử lý Alert', () => {
    // Bắt event alert và kiểm tra text
    cy.on('.btn ', (text) => {
      expect(text).to.contains('I am an alert box!') // text có thể thay theo thực tế
    })
    // Click nút trigger alert
    cy.contains('Alert').click()
  })

  it('Xử lý Prompt', () => {
    // Bắt event prompt và trả giá trị nhập liệu
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Test123') // nhập dữ liệu
      cy.contains('Prompt').click()
    })
  })

  it('Xử lý Confirm', () => {
    // Bắt event confirm và trả về false để bấm Cancel/Hủy
    cy.on('window:confirm', (text) => {
  expect(text).to.contains('I am a Js Confirm') // đúng nội dung confirm
  return false  // bấm Hủy
    })
    cy.contains('Confirm').click()
  })
})
