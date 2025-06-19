// models/Quotation.js
const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  products: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number,
      totalPrice: Number,
      category: String,
      Tax: Number,
    },
  ],
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quotations", quotationSchema);