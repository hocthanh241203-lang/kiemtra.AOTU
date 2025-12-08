describe("Shadow DOM - Basic Test", () => {
  it("Run jQuery, click shadow DOM button, verify alert", () => {
    cy.visit("https://practice.expandtesting.com/shadowdom");

    // ===== 1) Chạy jQuery giống như mở console =====
    cy.window().then((win) => {
      win.$("#my-btn").on("click", () => {
        alert("OK");
      });
    });

    // ===== 2) Click nút trong Shadow DOM =====
    cy.contains("This button is inside a Shadow DOM.", {
      includeShadowDom: true,
    })
      .should("be.visible")
      .click();

    // ===== 3) Kiểm tra alert =====
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("OK");
    });
  });
});
