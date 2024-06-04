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

    return lastInvoice[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = getLastInvoiceData;
