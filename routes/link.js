const express = require("express");
const bodyParser = require("body-parser");
const db = require("../data/database");
const lastInvoiceData = require("../util/lastInvoiceData");
const router = express.Router();
const number_words = require("../util/number_words");
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
    res.status(500).send("Error adding invoice");
  }
});

module.exports = [router];
