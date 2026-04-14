const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// ✅ DASHBOARD DATA
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    // 💰 TOTAL REVENUE
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);

    // 📦 TOTAL ORDERS
    const totalOrders = orders.length;

    // 📊 PRODUCTS COUNT
    const products = await Product.countDocuments();

    // 👤 USERS COUNT
    const users = await User.countDocuments();

    // 📈 MONTHLY SALES (last 6 months)
    const salesMap = {};

    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });

      salesMap[month] = (salesMap[month] || 0) + order.total;
    });

    const salesData = Object.keys(salesMap).map((key) => ({
      name: key,
      sales: salesMap[key],
    }));

    // 📉 ORDER COUNT GRAPH
    const orderMap = {};

    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });

      orderMap[month] = (orderMap[month] || 0) + 1;
    });

    const orderData = Object.keys(orderMap).map((key) => ({
      name: key,
      orders: orderMap[key],
    }));

    res.json({
      stats: {
        revenue,
        orders: totalOrders,
        products,
        users,
      },
      salesData,
      orderData,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Dashboard error" });
  }
});

module.exports = router;