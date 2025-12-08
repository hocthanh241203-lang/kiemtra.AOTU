describe("E2E Notes App - Register -> Login -> Add Note -> Verify -> Delete", () => {

  const baseUrl = "https://practice.expandtesting.com/notes/app";

  const user = {
    name: "Dung Bui",
    email: `test_${Date.now()}@gmail.com`,
    password: "123456"
  };

  const note = {
    title: "Ghi chú test",
    description: "Nội dung ghi chú test tự động"
  };

  it("Flow: Register -> Login -> Add -> Verify -> Delete", () => {

    // ===== 1. VISIT =====
    cy.visit(baseUrl);

    // ===== 2. REGISTER =====
    cy.get('[data-testid="open-register-view"]').click();

    cy.get('[data-testid="register-name"]').type(user.name);
    cy.get('[data-testid="register-email"]').type(user.email);
    cy.get('[data-testid="register-password"]').type(user.password);
    cy.get('[data-testid="register-confirm-password"]').type(user.password);

    cy.get('[data-testid="register-submit"]').click();
    cy.contains("User account created successfully").should("be.visible");

    // ===== 3. LOGIN =====
    cy.contains("Click here to Log In").click();

    cy.get('[data-testid="login-email"]').type(user.email);
    cy.get('[data-testid="login-password"]').type(user.password);

    cy.get('[data-testid="login-submit"]').click();
    cy.contains("My Notes").should("be.visible");

    // ===== 4. ADD NOTE =====
    cy.contains("+ Add Note").click();

    cy.get('[data-testid="note-category"]').select("Home");
    cy.get('[data-testid="note-completed"]').check();
    cy.get('[data-testid="note-title"]').type(note.title);
    cy.get('[data-testid="note-description"]').type(note.description);

    cy.get('[data-testid="note-submit"]').click();

    // verify card created
    cy.contains(".card-header", note.title).should("be.visible");

    // ===== 5. VERIFY NOTE =====
    cy.contains(".card", note.title).within(() => {
      cy.contains(note.description).should("be.visible");
    });

    // ===== 6. DELETE NOTE (bản fix click) =====
    cy.contains(".card", note.title)
  .scrollIntoView()
  .within(() => {
    cy.get('[data-testid="note-delete"]').click();
  });

// ===== Confirm popup =====
cy.get(".modal-content")
  .should("be.visible")
  .within(() => {
    cy.get('[data-testid="note-delete-confirm"]').click();
  });

// ===== 7. VERIFY REMOVED =====
cy.contains(".card-header", note.title).should("not.exist");

  });

});
