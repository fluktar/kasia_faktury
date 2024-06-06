const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const print = require("../util/print");
const db = require("../data/database");
const getInvoiceList = require("../util/invoice_element");
const lastInvoiceData = require("../util/lastInvoiceData");
const removeInvoice = require("../util/remove_invoice");
const router = express.Router();
const number_words = require("../util/number_words");

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(methodOverride("_method"));

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { loginToInvoice, passwordToLogin } = req.body;

  try {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ userName: loginToInvoice });
    const password = await db
      .getDb()
      .collection("users")
      .findOne({ password: passwordToLogin });

    if (user && password) {
      const lastInvoice = await lastInvoiceData();
      res.render("index", { invoice: lastInvoice });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/kasia_faktury", async (req, res) => {
  const { hours, rate, description, invoiceNumber, date } = req.body;
  const rateMultiplyHours = hours * rate;

  const invoice = {
    hours,
    rate,
    description,
    invoiceNumber,
    date,
    rateMultiplyHours,
  };
  const numberToWords = number_words(invoice.rateMultiplyHours);

  try {
    await db.getDb().collection("faktury_kasia").insertOne(invoice);
    console.log("udało się dodać dane");
    res.render("invoice", { invoice: invoice, numberToWords: numberToWords });
  } catch (error) {
    console.log(error);
    res.render("index");
  }
});

router.post("/save-pdf", async (req, res) => {
  const { htmlContent } = req.body;
  const outputPath = path.join(
    __dirname,
    "..",
    "faktury",
    `${new Date().toISOString().split("T")[0]}.pdf`
  );

  try {
    await print(htmlContent, outputPath);
    res.status(200).send("PDF zapisany pomyślnie.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Błąd podczas zapisywania PDF.");
  }
});

router.get("/invoices", async (req, res) => {
  try {
    const getInvoices = await getInvoiceList();
    res.render("invoices", { invoices: getInvoices });
  } catch (error) {
    console.log(error);
  }
});

router.get("/invoice/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const getInvoices = await getInvoiceList();
    const invoice = getInvoices.find((inv) => inv._id.toString() === invoiceId);

    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }

    const numberToWords = number_words(invoice.rateMultiplyHours);

    // Script to be injected
    const script = `
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          const savePdfButton = document.getElementById("save-pdf");
          if (savePdfButton) {
            savePdfButton.innerText = "Print PDF";
            savePdfButton.addEventListener("click", function() {
              window.print();
            });
          }
        });
      </script>
      <style>
        @page {
          size: A4;
          margin: 10mm;
        }
        @media print {
          body {
            zoom: 80%; 
          }
          #save-pdf{
            display: none;
          }
        }
      </style>
    `;

    res.render("invoice", {
      invoice: invoice,
      numberToWords: numberToWords,
      script: script,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving invoice");
  }
});

// Dodanie obsługi usuwania faktur metodą POST z method-override
router.post("/remove/:id", (req, res) => {
  const invoiceId = req.params.id;

  db.getDb()
    .collection("faktury_kasia")
    .deleteOne({ _id: new ObjectId(invoiceId) })
    .then(() => {
      return db.getDb().collection("faktury_kasia").find().toArray();
    })
    .then((invoices) => {
      res.render("invoices", { invoices: invoices });
    })
    .catch((error) => {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "An error occurred" });
    });
});

// Global error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
