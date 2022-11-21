const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
    },
    mobile: {
      type: Number,
      required: [true, "Please enter your Number!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
