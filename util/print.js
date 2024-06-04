const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const print = async (htmlContent, outputFilePath) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Załaduj treść HTML
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Zastosuj style z pliku CSS
    const cssPath = path.join(__dirname, "..", "dist", "css/style.min.css"); // Zmień ścieżkę na odpowiednią
    const cssContent = fs.readFileSync(cssPath, "utf8");
    await page.addStyleTag({ content: cssContent });

    // Ukryj przycisk w trybie drukowania
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = ".no-print { display: none !important; }"; // Użyj !important dla pewności
      document.head.appendChild(style);
    });

    // Generowanie PDF-a
    await page.pdf({
      path: outputFilePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log("PDF wygenerowany pomyślnie!");
  } catch (error) {
    console.error("Błąd podczas generowania PDF:", error);
  }
};

module.exports = print;
