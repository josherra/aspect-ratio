const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogueSchema = new Schema({
  title: String,
  description: String,
  games: [{ id: Schema.Types.ObjectId }],
  owner: String,
  created: Date.now,
});

module.exports = mongoose.model("Catalgoue", CatalogueSchema);
