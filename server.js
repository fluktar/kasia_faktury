const path = require("path");

const express = require("express");

const Routes = require("./routes/link");
const db = require("./data/database");

const app = express();

const session = require("express-session");

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use("/dist", express.static("dist")); // Serve static files (e.g. CSS files)

app.use(Routes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  const port = process.env.PORT || 4501;
  app.listen(port);
});
