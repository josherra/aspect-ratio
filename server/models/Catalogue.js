const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catalogueSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    games: [
      {
        id: Number,
        name: String,
        platforms: [{ id: String, category: String, name: String }],
        release_dates: [Number],
        cover: {
          id: Number,
          image_id: String,
          url: String,
        },
      },
    ],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalogue", catalogueSchema);
