describe("New Window Handling - FIX Google Ads", () => {

  beforeEach(() => {
    // Chặn quảng cáo Google gây chặn trang
    cy.intercept("GET", "**/googleads/**", { statusCode: 204 }).as("blockAds");
    cy.intercept("GET", "**/pagead/**", { statusCode: 204 }).as("blockAd2");

    cy.visit("https://practice.expandtesting.com/windows");
  });

  it.only("Find text on new window page", () => {

    cy.log("=== STEP 1: Remove target ===");
    cy.contains("Click Here")
      .invoke("removeAttr", "target")
      .click();

    // cy.log("=== STEP 2: Wait correct URL ===");
    // cy.url({ timeout: 15000 })
    //   .should("include", "/windows/new");

    // cy.log("=== STEP 3: Verify heading ===");
    cy.get("h1", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Example of a new window page for Automation Testing Practice");
  });

});
