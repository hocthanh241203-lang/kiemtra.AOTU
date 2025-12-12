const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// Đọc credentials
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const { client_secret, client_id, redirect_uris } = credentials.installed;

// Tạo OAuth client
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Tạo link login
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/gmail.readonly"],
});

console.log("👉 Mở link sau và đăng nhập Gmail:");
console.log(authUrl);

// Tạo interface để nhập code từ terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Hỏi người dùng mã code
rl.question("\n🔑 Nhập mã code tại đây: ", (code) => {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error("❌ Lỗi khi lấy token:", err);
      return;
    }

    // Lưu token vào file token.json
    fs.writeFileSync("token.json", JSON.stringify(token, null, 2));

    console.log("\n🎉 Tạo token.json thành công!");
    console.log("➡️ Bạn có thể chạy Cypress lấy OTP.");
    rl.close();
  });
});
