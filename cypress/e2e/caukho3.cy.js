describe("Login OTP", () => {

  it("Đăng nhập thành công", () => {
    cy.visit("https://practice.expandtesting.com/otp-login");

    cy.get("#email").type("hocthanh241203@gmail.com");
    cy.contains("Send OTP").click();

    cy.wait(3000);

    cy.task("getOtpFromGmail").then((otp) => {
      expect(otp).to.not.be.null;
      cy.get("#otp").type(otp);
      cy.contains("Verify").click();
    });
    cy.contains(" Logout").should("be.visible");
    
  });

});
