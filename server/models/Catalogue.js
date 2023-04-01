const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catalogueSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: String,
    description: String,
    games: [{ id: String, name: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalgoue", catalogueSchema);
