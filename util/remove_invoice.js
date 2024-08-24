const { ObjectId } = require("mongodb");
const db = require("../data/database");

const removeInvoice = (req, res, next) => {
  const invoiceId = req.params.id;
  // Logowanie otrzymanego identyfikatora

  if (!ObjectId.isValid(invoiceId)) {
    console.error("Invalid invoice ID received:", invoiceId);
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  db.getDb()
    .collection("faktury_kasia")
    .deleteOne({ _id: new ObjectId(invoiceId) }, (err, result) => {
      if (err) {
        console.error("Error deleting invoice:", err);
        return res.status(500).json({ message: "An error occurred" });
      } else {
        console.log("Invoice removed");
        res.status(200).json({ message: "Invoice removed" });
      }
    });
};

module.exports = removeInvoice;
