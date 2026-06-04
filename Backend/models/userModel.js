const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },

  
    firstName: { 
      type: String 
    },

    lastName: String,

    email: { 
      type: String, 
      unique: true, 
      required: true 
    },

    password: { 
      type: String, 
      required: true 
    },

    phone: String,
    address: String,

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