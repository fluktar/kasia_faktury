// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("faktury_kasia");

// Create a new document in the collection.
db.getCollection("users").insertOne({
  username: "kasia",
  password: "kasia123",
});
