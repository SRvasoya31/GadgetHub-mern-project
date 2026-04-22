require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// ============================
// ✅ CONNECT DATABASE
// ============================
connectDB();

// ============================
// ✅ MIDDLEWARE
// ============================
app.use(cors({
  origin: "*", // change to frontend URL in production
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// ✅ STATIC FILES
// ============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================
// ✅ ROUTES
// ============================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ============================
// ✅ TEST ROUTE
// ============================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ============================
// ❌ 404 HANDLER
// ============================
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found ❌"
  });
});

// ============================
// ❌ GLOBAL ERROR HANDLER
// ============================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Server Error ❌"
  });
});

// ============================
// ✅ START SERVER
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});