const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// ==========================
// ✅ GET ALL ORDERS (ADMIN)
// ==========================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ==========================
// ✅ GET USER ORDERS (FIXED)
// ==========================
router.get("/my/:userId", async (req, res) => {
  try {
    console.log("Fetching orders for:", req.params.userId);

    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    console.log("Orders found:", orders.length);

    res.json(orders); // ✅ IMPORTANT
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ==========================
// ✅ UPDATE STATUS
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({});
  }
});

module.exports = router;