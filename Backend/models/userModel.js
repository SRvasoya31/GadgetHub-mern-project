const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: String,
    phone: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);