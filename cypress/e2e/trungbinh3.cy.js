/// <reference types="cypress" />

describe("Form Validation page for Automation Testing Practice", () => {
  const pageUrl = "https://practice.expandtesting.com/form-validation"; // thay URL thật

  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it("Kiểm tra toàn bộ form validation và Register button", () => {
    // ===== 1) Xác minh heading =====
    cy.contains("Form Validation page for Automation Testing Practice")
      .should("be.visible");

    // ===== 2) Contact Name =====
    cy.get("#validationCustom01")
      .clear()
      .type("dodo");

    // Trigger validation
    cy.get("form").invoke("addClass", "was-validated");

    cy.get("#validationCustom01")
      .parent()
      .find(".valid-feedback")
      .should("be.visible")
      .and("contain", "Looks good!");

    // ===== 3) Contact Number =====
    const contactnumber = "#validationCustom05";

    // Trường hợp sai
    cy.get(contactnumber).clear().type("abc");
    cy.get("form").invoke("addClass", "was-validated");

    cy.get(contactnumber)
      .parent()
      .find(".invalid-feedback")
      .should("be.visible")
      .and("contain", "Please provide your Contact number.");

    // Trường hợp hợp lệ
   cy.get("#validationCustom05").clear().type("012-3456789");
cy.get("form").invoke("addClass", "was-validated");

// Chỉ kiểm tra invalid-feedback ẩn
cy.get("#validationCustom05")
  .parent()
  .find(".invalid-feedback")
  .should("not.be.visible");
    // ===== 4) PickUp Date =====
    cy.get('input[name="pickupdate"]')
    .type("2025-12-10")  // format yyyy-mm-dd cho type=date
    .blur();

    cy.get("form").invoke("addClass", "was-validated");

    cy.get('input[name="pickupdate"]')
      .parent()
      .find(".invalid-feedback")
      .should("not.be.visible");

    // ===== 5) Payment Method =====
    cy.get('select[name="payment"]').select("card");

    // ===== 6) Register button =====
    cy.contains( "Register").click();

    // Kiểm tra tín hiệu submit thành công
    cy.contains("Thank you for validating your ticket")
      .should("be.visible");
  });
});
