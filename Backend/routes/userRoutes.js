const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/userController");

// ============================
// ✅ PROFILE ROUTES (USER)
// ============================
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

// ============================
// ✅ ADMIN ROUTES
// ============================

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// BLOCK / UNBLOCK USER
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    user.status = user.status === "active" ? "blocked" : "active";

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;