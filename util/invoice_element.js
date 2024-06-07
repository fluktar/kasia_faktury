const db = require("../data/database");

const getInvoiceList = async () => {
  try {
    db.getDb();
    return await db.getDb().collection("faktury_kasia").find({}).toArray();
  } catch (error) {
    console.log(error);
  }
};

module.exports = getInvoiceList;
