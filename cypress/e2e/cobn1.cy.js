describe("Test thử findByRole", () => {
    
    it("getByRole", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
         cy.findByRole("link", { name: "Contact" })
      .should("be.visible");

    });

    it("getByText", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.contains("🔥 Hot Deal: Buy 1 Get 1 Free").should("be.visible");
        // Nếu bạn muốn dùng Testing Library:
        // cy.findByText("🔥 Hot Deal: Buy 1 Get 1 Free").should("be.visible");
    });

    it("getByLabel", () => {
        cy.visit("https://practice.expandtesting.com/locators/");

        // Choose a country
        cy.contains("label", "Choose a country")
            .invoke("attr", "for")
            .then((id) => {
                cy.get(`#${id}`).should("be.visible");
            });

        // Email for newsletter
        cy.contains("label", "Email for newsletter")
            .invoke("attr", "for")
            .then((id) => {
                cy.get(`#${id}`).should("be.visible");
            });
    });

    it("getByPlaceholder", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.get('input[placeholder="Search the site"]').should("be.visible");
    });

       it("getByAltText", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.get('img[alt="User avatar"]').should("be.visible");

   
    });
    it("getByTitle", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.get('[title="Settings panel"]').should("be.visible");
    });
    it("🧪 getByTestId", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.get('[data-testid="status-message"]').should("be.visible");
        cy.get('[data-testid="user-name"]').should("be.visible");
    });
    it(" Legacy class", () => {
        cy.visit("https://practice.expandtesting.com/locators/");
        cy.get(".legacy-css ").should("be.visible");
    });
    it("XPath – List", () => {
    cy.visit("https://practice.expandtesting.com/locators/");

    cy.get('ul.legacy-list > li')
      .should('have.length', 3);
  });
  it("XPath - Table", () => {
    cy.visit("https://practice.expandtesting.com/locators/");

    let total = 0;

    cy.get('table tbody tr').each(($row) => {
      const status = $row.find('td').eq(1).text();
      const stock = Number($row.find('td').eq(2).text());

      if (status === "Available") {
        total += stock;
      }
    }).then(() => {
      // Headphones stock = 12
      cy.xpath('//table//tr[td[1]="Headphones"]/td[3]')
        .should('have.text', '12');

      // Tổng stock các dòng Available = 17
      expect(total).to.equal(17);
    });         
  });
});
