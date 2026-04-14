const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ GET USERS
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ✅ DELETE USER
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ BLOCK / UNBLOCK
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  user.status = user.status === "active" ? "blocked" : "active";

  await user.save();

  res.json(user);
});

module.exports = router;