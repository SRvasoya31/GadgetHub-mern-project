// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [
//       {
//         name: String,
//         price: Number,
//         quantity: Number,
//         image: String,
//       },
//     ],

//     total: {
//       type: Number,
//       required: true,
//     },

//     // ✅ FIXED ENUM
//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
//       default: "Paid",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["COD", "ONLINE"],
//       default: "ONLINE",
//     },

//     paymentId: String,
//     orderId: String,

//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       area: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    total: Number,

    status: {
      type: String,
      enum: ["Paid", "Shipped", "Delivered", "Cancelled"],
      default: "Paid",
    },

    paymentMethod: String,
    paymentId: String,
    orderId: String,

    address: {
      fullName: String,
      phone: String,
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);