it("Kéo 3 items vào target theo thứ tự: Đỏ → Xanh Lam → Xanh Lá", () => {

    cy.visit("https://practice.expandtesting.com/drag-and-drop-circles");

    // Danh sách các item theo thứ tự muốn kéo
    const items = [
        "#source .red",     // đỏ
        "#source .blue",    // xanh lam
        "#source .green"    // xanh lá
    ];

    const target = "#target";

    // Tạo object DataTransfer cho sự kiện drag-drop HTML5
    const dataTransfer = new DataTransfer();

    // ===== VÒNG LẶP FOR =====
    for (let i = 0; i < items.length; i++) {

        // Chọn item hiện tại
        cy.get(items[i])
            .should("be.visible")
            .trigger("dragstart", { dataTransfer });

        // Thả vào target
        cy.get(target)
            .trigger("drop", { dataTransfer })
            .trigger("dragend", { dataTransfer });

        cy.log("Đã kéo: " + items[i]);
    }
});
