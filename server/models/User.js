const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please add a name."] },
    username: {
      type: String,
      required: [true, "Please add an email."],
      unique: true,
    },
    password: { type: String, required: [true, "Please add a password"] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
