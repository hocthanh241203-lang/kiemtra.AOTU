it.only("Quay bảng màu", () => {
    const screenshotName = "wheel-result";
    const specName = Cypress.spec.name;

    cy.visit("https://practice.expandtesting.com/color-wheel");

    cy.get("#playBtn").contains("Play Game").click();

    cy.wait(5000);
    cy.get("#picker")
      .screenshot(screenshotName, { overwrite: true })
      .then(() => {
        cy.task("detectWheelColor", { specName, screenshotName }).then(
          (color) => {
            cy.log(`Màu phát hiện: ${color.toUpperCase()}`);
            cy.get("#answers").contains(`${color}`).click();
          }
        );
      });
  });