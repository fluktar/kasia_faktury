const { ObjectId } = require("mongodb");
const db = require("../data/database");

const removeInvoice = (req, res, next) => {
  const invoiceId = req.params.id;

  db.getDb()
    .collection("faktury_kasia")
    .deleteOne({ _id: new ObjectId(invoiceId) }, (err, result) => {
      if (err) {
        console.error("Error deleting invoice:", err); // Logowanie błędu
        res.status(500).json({ message: "An error occurred" });
      } else {
        console.log("Invoice removed");
        res.status(200).json({ message: "Invoice removed" });
      }
    });
};

module.exports = removeInvoice;
