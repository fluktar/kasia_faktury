const express = require("express");
const db = require("../data/database");

const getLastInvoiceData = async () => {
  try {
    const lastInvoice = await db
      .getDb()
      .collection("faktury_kasia")
      .find()
      .sort({ date: -1 })
      .limit(1)
      .toArray();
    if (lastInvoice.length > 0) {
      return lastInvoice[0];
    } else {
      return {
        hours: "1",
        rate: "1",
        description: "opis do faktury",
        invoiceNumber: "1/1/2000",
        date: "2000-01-1",
        rateMultiplyHours: 1,
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = getLastInvoiceData;
