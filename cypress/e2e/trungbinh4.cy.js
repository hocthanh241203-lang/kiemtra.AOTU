describe("Wait for all tasks completion", () => {
    it("Chờ tới khi tất cả task hoàn tất", () => {
        cy.visit("https://practice.expandtesting.com/slow");

        // Chờ tới khi tất cả 10 task hoàn tất
        // Giả sử mỗi task có element hiển thị trạng thái class='task' và khi xong sẽ có text 'Completed'
        cy.get(".alert ", { timeout: 10000 }).each(($el) => {
            cy.wrap($el).should("contain.text", "The slow task has finished. Thanks for waiting!");
        });

    
    });
});
