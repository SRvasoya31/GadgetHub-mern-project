const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
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
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);