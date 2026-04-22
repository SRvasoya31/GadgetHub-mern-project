const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const multer = require("multer");

// ✅ MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ================= GET =================
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// ================= ADD =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      oldPrice,
      discount,
      stock,
      category,
      bestseller
    } = req.body;

    const product = new Product({
      name,
      price: Number(price),
      oldPrice: Number(oldPrice),
      discount: Number(discount),
      stock: Number(stock),
      category,
      bestseller: bestseller === "true",
      image: req.file ? req.file.filename : ""
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("❌ PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= UPDATE =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      oldPrice,
      discount,
      stock,
      category,
      bestseller
    } = req.body;

    const updated = {
      name,
      price: Number(price),
      oldPrice: Number(oldPrice),
      discount: Number(discount),
      stock: Number(stock),
      category,
      bestseller: bestseller === "true"
    };

    if (req.file) {
      updated.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updated,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;