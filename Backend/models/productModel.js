const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    price: { type: Number, required: true },
    oldPrice: Number,
    discount: Number,

    image: String,
    images: [String],

    stock: { type: Number, default: 0 },
    category: String,

    bestseller: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);