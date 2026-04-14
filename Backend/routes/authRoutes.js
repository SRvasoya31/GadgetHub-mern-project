const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      password: hashed,
      phone,
      role: "user",
      status: "active"
    });

    res.json({ message: "Signup success ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ SIGNIN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Email" });

    if (user.status === "blocked") {
      return res.status(403).json({ message: "User blocked ❌" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "20m" } // 🔥 20 min
    );

    res.json({
      token,
      expiresIn: 20 * 60,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PROTECTED ROUTE
router.get("/profile", (req, res) => {
  res.json({
    message: "Protected Data 🔐",
    user: "No authentication required"
  });
});

module.exports = router;