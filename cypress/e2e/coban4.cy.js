describe("Click nút màu vàng 10 lần liên tiếp", () => {
  it("Click button warning 10 times with redirect wait", () => {
    cy.visit("https://practice.expandtesting.com/challenging-dom");

    function clickButton(times) {
      if (times === 0) return;

      cy.get("a.btn.btn-warning.mb-2", { timeout: 15000 })
        .first()
        .should("be.visible")
        .click();

      cy.get("table", { timeout: 10000 })
        .should("be.visible")
        .then(() => {
          clickButton(times - 1);
        });
    }

    clickButton(10);
  });
});
