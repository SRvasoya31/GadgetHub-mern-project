const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const multer = require("multer");

// STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   ADD PRODUCT
========================= */
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        image: req.files.mainImage?.[0]?.filename || "",
        images: req.files.images
          ? req.files.images.map(file => file.filename)
          : []
      });

      await product.save();
      res.status(201).json(product);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/* =========================
   GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/* =========================
   DELETE PRODUCT
========================= */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* =========================
   UPDATE PRODUCT
========================= */
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };

      if (req.files.mainImage) {
        updateData.image = req.files.mainImage[0].filename;
      }

      if (req.files.images) {
        updateData.images = req.files.images.map(f => f.filename);
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updated);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;  