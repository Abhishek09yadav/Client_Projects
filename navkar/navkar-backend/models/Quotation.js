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
  Status:{
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed"],
  },
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quotation", quotationSchema);
