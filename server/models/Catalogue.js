const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catalogueSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    games: [{ id: String, name: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalogue", catalogueSchema);
