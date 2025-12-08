describe("OTP Login Test", () => {
    it("Đăng nhập thành công và xác minh Logout", () => {
        // 1. Vào trang OTP login
        cy.visit("https://practice.expandtesting.com/otp-login");

        // 2. Nhập email cá nhân
        cy.get('input[type="email"]').type("hocthanh241203@gmail.com");

        // 3. Click nút Send OTP (hoặc Login)
        cy.get('button[type="submit"]').click();

        // 4. Lấy OTP (thường test site cung cấp sẵn OTP để test)
        cy.get('#otp').then(($otp) => {
            const otp = $otp.val() || "060064"; // nếu test site hiện OTP sẵn hoặc bạn nhập tay
            cy.get('input[name="otp"]').type(otp);
        });

        // 5. Click nút xác nhận OTP
        cy.get('button[type="submit"]').contains("Verify").click();

        // 6. Xác minh đăng nhập thành công bằng cách kiểm tra nút Logout tồn tại
        cy.get('.icon-2x').contains("Logout").should("be.visible");
    });
});
