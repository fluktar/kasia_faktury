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
    const cssPath = path.join(__dirname, "..", "dist", "css", "style.min.css"); // Zmień ścieżkę na odpowiednią
    const cssContent = fs.readFileSync(cssPath, "utf8");
    await page.addStyleTag({ content: cssContent });

    // Zastosuj style dla drukowania
    await page.addStyleTag({
      content: `
      @page {
        size: A4;
        margin: 20mm;
      }
      
      body {
        font-family: Arial, sans-serif;
        font-size: 12pt;
        line-height: 1.5;
      }
      
      .no-print {
        display: none !important;
      }
      
      header, footer {
        page-break-after: always;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
      table, th, td {
        border: 1px solid black;
      }
      
      th, td {
        padding: 8px;
        text-align: left;
      }
      
      .content {
        margin: 0;
        padding: 0;
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
      }
      
      h1 {
        font-size: 18pt;
      }
      
      h2 {
        font-size: 16pt;
      }
      
      p {
        margin: 0;
        padding: 0;
      }
      
      img {
        max-width: 100%;
        height: auto;
      }
      
      .block {
        display: block;
        page-break-inside: avoid;
      }
    `,
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
