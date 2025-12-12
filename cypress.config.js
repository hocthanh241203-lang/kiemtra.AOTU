const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");

//==============================
// Load JIMP (optional)
//==============================
let Jimp = null;
try {
  Jimp = require("jimp");
} catch (e) {
  console.error("⚠️ Không thể load Jimp:", e.message);
}

//==============================
// Load Tesseract.js (OCR)
//==============================
let tesseract = null;
try {
  tesseract = require("tesseract.js");
} catch (e) {
  console.error("⚠️ Không thể load Tesseract.js:", e.message);
}

module.exports = defineConfig({
  pixelRatio: 1,

  e2e: {
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      on("task", {

        // ============================
        // 🎯 TASK 1: Detect Wheel Color
        // ============================
        async detectWheelColor({ screenshotName }) {
          try {
            const fullPath = path.join(
              "cypress",
              "screenshots",
              `${screenshotName}.png`
            );

            if (!fs.existsSync(fullPath)) {
              console.error("⚠️ Ảnh không tồn tại:", fullPath);
              return "image_not_found";
            }

            if (!Jimp) {
              console.error("⚠️ Jimp chưa được import");
              return "jimp_not_loaded";
            }

            const img = await Jimp.read(fullPath);
            const w = img.bitmap.width;
            const h = img.bitmap.height;

            const centerX = Math.floor(w / 2);
            const centerY = Math.floor(h / 2);

            let sampleX = centerX;
            let sampleY = Math.max(0, Math.min(centerY - 70, h - 1));

            const { r, g, b } = Jimp.intToRGBA(
              img.getPixelColor(sampleX, sampleY)
            );

            const colorsMap = [
              { name: "gray", rgb: [190, 190, 190] },
              { name: "black", rgb: [0, 0, 0] },
              { name: "brown", rgb: [165, 42, 42] },
              { name: "white", rgb: [255, 255, 255] },
              { name: "orange", rgb: [255, 165, 0] },
              { name: "purple", rgb: [160, 32, 240] },
              { name: "yellow", rgb: [255, 255, 0] },
              { name: "pink", rgb: [255, 20, 147] },
              { name: "blue", rgb: [0, 0, 255] },
              { name: "green", rgb: [0, 255, 0] },
            ];

            let bestMatch = "unknown";
            let minDiff = 9999;

            for (const c of colorsMap) {
              const diff =
                Math.abs(r - c.rgb[0]) +
                Math.abs(g - c.rgb[1]) +
                Math.abs(b - c.rgb[2]);
              if (diff < minDiff) {
                minDiff = diff;
                bestMatch = c.name;
              }
            }

            return bestMatch;

          } catch (err) {
            console.error("❌ Lỗi detectWheelColor:", err.message);
            return "error_detecting_color";
          }
        },

        // ============================================
        // 🎯 TASK 2: Lấy OTP từ Gmail (Gmail API)
        // ============================================
        async getOtpFromGmail() {
          try {
            const credentials = JSON.parse(fs.readFileSync("credentials.json"));
            const token = JSON.parse(fs.readFileSync("token.json"));

            const { client_secret, client_id, redirect_uris } = credentials.installed;

            const oAuth2Client = new google.auth.OAuth2(
              client_id,
              client_secret,
              redirect_uris[0]
            );

            oAuth2Client.setCredentials(token);

            const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

            // Tìm email có tiêu đề chứa OTP
            const res = await gmail.users.messages.list({
              userId: "me",
              q: "subject:OTP",
              maxResults: 1,
            });

            if (!res.data.messages) {
              console.warn("⚠️ Không tìm thấy email OTP");
              return null;
            }

            const id = res.data.messages[0].id;

            const msg = await gmail.users.messages.get({
              userId: "me",
              id: id,
            });

            const bodyData = msg.data.payload.parts?.[0]?.body?.data;

            if (!bodyData) {
              console.warn("⚠️ Không đọc được nội dung email OTP");
              return null;
            }

            const body = Buffer.from(bodyData, "base64").toString();

            const otp = body.match(/\b\d{6}\b/);

            return otp ? otp[0] : null;

          } catch (err) {
            console.error("❌ Lỗi getOtpFromGmail:", err.message);
            return null;
          }
        },

        // ============================================
        // 🎯 TASK 3: OCR từ canvas/hình ảnh
        // ============================================
        async ocr(dataUrl) {
          try {
            if (!tesseract) {
              console.error("⚠️ Tesseract.js chưa được import");
              return null;
            }

            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            const { data: { text } } = await tesseract.recognize(buffer, "eng");

            return text;

          } catch (err) {
            console.error("❌ Lỗi OCR:", err.message);
            return null;
          }
        },

      });

      return config;
    },
  },
});
