describe("Find value 48.48 in table", () => {
  it("Scroll and find the cell with text 48.48", () => {
    cy.visit("https://practice.expandtesting.com/large");

    // Scroll đến cell
    cy.contains("td", "48.48")
      .scrollIntoView({ duration: 500 }) // cuộn xuống vị trí thật
      .should("be.visible");             // giờ mới visible
  });
});
