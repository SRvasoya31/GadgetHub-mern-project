const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    images: [String],
    stock: Number,
    category: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);