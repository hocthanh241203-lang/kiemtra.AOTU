describe("Color Wheel Auto Spin Test", () => {
    it("Lấy màu trúng từ lần quay đầu tiên và chọn đáp án đúng", () => {
        cy.visit("https://practice.expandtesting.com/color-wheel");

        // 1. Chờ màu trúng được highlight (ví dụ có class 'selected')
        cy.get(".color.selected", { timeout: 10000 }).then(($el) => {
            const winningColor = $el.text().trim();
            cy.log("Màu trúng là: " + winningColor);

            // 2. Chọn đáp án đúng dựa trên màu trúng
            // Giả sử đáp án là button có text màu
            cy.contains("button", winningColor).click();
        });
    });
});
