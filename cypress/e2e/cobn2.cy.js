describe("Shadow DOM Alert Test", () => {

  it("Trigger click inside shadow DOM and check alert", () => {
    cy.visit("https://practice.expandtesting.com/shadowdom#google_vignette");

    // === 1) Inject đoạn JS vào browser ===
    cy.window().then((win) => {
      win.$("#my-btn").on("click", () => {
        alert("OK");
      });
    });

    // === 2) Click nút trong Shadow DOM ===
    cy.contains("button", "This button is inside a Shadow DOM.", { includeShadowDom: true })
      .should("exist")
      .click();

    // === 3) Bắt và xác minh alert ===
    cy.on("window:alert", (txt) => {
      expect(txt).to.equal("OK");
    });
  });
});
