const { defineConfig } = require("cypress");
const Tesseract = require("tesseract.js");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // --- ĐĂNG KÝ TASK OCR ---
      on("task", {
        ocr(dataUrl) {
          return Tesseract.recognize(dataUrl, "eng")
            .then(({ data: { text } }) => {
              return text;
            })
            .catch((err) => {
              console.error("OCR Error:", err);
              return null;
            });
        }
      });

      return config;
    },
  },
});
