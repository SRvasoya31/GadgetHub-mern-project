const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// =====================
// ✅ GET PROFILE
// =====================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// =====================
// ✅ UPDATE PROFILE
// =====================
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.address = address || user.address;

    await user.save();

    res.json({
      message: "Profile updated ✅",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// =====================
// ✅ CHANGE PASSWORD
// =====================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong current password ❌" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};