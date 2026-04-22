const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
};

// SIGNIN
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email ❌" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password ❌" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
};