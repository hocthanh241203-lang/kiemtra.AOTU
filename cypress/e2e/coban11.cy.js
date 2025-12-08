describe("Flaky Test Demo - Stable Version", () => {

  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/flaky-test");
  });

  it.only("Handle DOM + Action flaky correctly",{retries: 10}, () => {
    cy.contains("Ready")
      .should("exist")
      .should("be.visible")
      .click();
  });

});
