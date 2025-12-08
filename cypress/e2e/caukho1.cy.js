describe("Lấy số Answer trong ảnh cuối trang", () => {

  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/challenging-dom");
  });

 it("Cách 1: test thử log", () => {
   cy.get("#canvas").then(($canvas) => {
  const dataUrl = $canvas[0].toDataURL();

  cy.task("ocr", dataUrl).then((text) => {
    const number = text.match(/\d+/)[0];
    cy.log("Answer =", number);
  });
});

});

 


});
