describe("Lấy danh sách giá trị của bảng - array of objects", () => {
  it("Read table into array of objects", () => {
    cy.visit("https://practice.expandtesting.com/challenging-dom");

    cy.get("table tbody tr").then((rows) => {
      const data = [];

      rows.each((i, row) => {
        const cells = Cypress.$(row).find("td");

        data.push({
          Lorem: cells.eq(0).text().trim(),
          Ipsum: cells.eq(1).text().trim(),
          Dolor: cells.eq(2).text().trim(),
          Sit: cells.eq(3).text().trim(),
          Amet: cells.eq(4).text().trim(),
          Edit: cells.eq(5).find("a.btn-primary").text().trim(),
          Delete: cells.eq(5).find("a.btn-danger").text().trim(),
        });
      });

      cy.log("DATA:", JSON.stringify(data, null, 2));

      // ví dụ assert đơn giản
      expect(data.length).to.be.greaterThan(0);
    });
  });
});
