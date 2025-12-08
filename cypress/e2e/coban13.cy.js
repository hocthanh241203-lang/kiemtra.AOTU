describe("Geolocation - Basic Test", () => {

  it("Click Where Am I -> Allow Location -> Verify City", () => {

    cy.visit("https://practice.expandtesting.com/geolocation");

    cy.log("=== STEP 1: Stub geolocation (simulate Allow) ===");

    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition")
        .callsFake((success) => {
          success({
            coords: {
              latitude: 10.762622,
              longitude: 106.660172,
            },
          });
        });
    });

    cy.log("=== STEP 2: Click 'Where Am I' ===");
    cy.contains("Where am I?").click();

    cy.log("=== STEP 3: Verify latitude & longitude ===");
    cy.get("#lat-value").should("contain.text", "10.762622");
    cy.get("#lon-value").should("contain.text", "106.660172");

    cy.log("=== STEP 4: Verify City displayed ===");
    cy.get("#map-link", { timeout: 15000 })
      .should("be.visible")
      .and("have.attr", "href")
      .and("contain", "10.762622,106.660172");
  });

});
