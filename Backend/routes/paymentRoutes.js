const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

const router = express.Router();

// ✅ INIT RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================
// ✅ CREATE ORDER
// ==========================
router.post("/create-order", async (req, res) => {
  try {
    let { amount } = req.body;

    console.log("👉 Amount from frontend:", amount);

    // ✅ VALIDATION
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount ❌",
      });
    }

    // ✅ SAFE LIMIT (Razorpay test limit)
    const MAX_AMOUNT = 50000; // ₹50,000

    if (amount > MAX_AMOUNT) {
      console.log("⚠ Amount too high → limiting to 50K");

      amount = MAX_AMOUNT; // 🔥 FIX
    }

    // ✅ CREATE ORDER
    const options = {
      amount: Math.round(amount * 100), // RUPEES → PAISE
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    console.log("👉 Final amount to Razorpay:", options.amount);

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (err) {
    console.error("❌ Create Order Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// ✅ VERIFY PAYMENT + SAVE ORDER
// ==========================
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cart,
      total,
      address,
      userId,
    } = req.body;

    // ✅ SIGNATURE VERIFY
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Invalid signature ❌",
      });
    }

    // ✅ SAVE ORDER (REAL TOTAL)
    const newOrder = new Order({
      userId,
      items: cart,
      total, // full amount (not limited)
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      address,
      paymentMethod: "ONLINE",
      status: "Paid",
    });

    await newOrder.save();

    console.log("✅ Order saved");

    res.json({
      success: true,
      message: "Payment successful ✅",
    });

  } catch (err) {
    console.error("❌ Verify Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;