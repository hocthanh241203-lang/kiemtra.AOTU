
Cypress.on('uncaught:exception', (err) => {
  // Bỏ qua lỗi Google Ads / AdsByGoogle
  if (err.message.includes('adsbygoogle')) {
    return false; // Không fail test
  }
});
