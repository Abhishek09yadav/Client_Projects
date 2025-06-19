// quotationRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Users = require("../models/models");
const Quotation = require("../models/Quotation");
const Quotation = require('../models/Quotations');
const Product = require('../index');
const Quotations = require('../models/Quotations');
const { ObjectId } = require("mongoose").Types;
const baseUrl = process.env.BASE_URL;

// PDF storage engine
const pdfStorage = multer.diskStorage({
  destination: "./upload/pdf", // Save PDFs in the pdf folder
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}.pdf`);
  },
});

// Configure multer for PDF uploads
const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

// Route to upload a quotation
router.post("/uploadQuotation", async (req, res) => {
  const { user, products, totalPrice } = req.body;
  console.log("Received user ID:", user);

  if (
    !user?.email ||
    !products ||
    !Array.isArray(products) ||
    products.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "User email and product list are required." });
  }

  try {
    // if (!mongoose.isValidObjectId(user.email)) {
    //   return res.status(400).json({ message: "invalid user email" });
    // }
    // const id = ObjectId.createFromHexString(user.email);
    const existingUser = await Users.findOne({ email: user.email });
    console.log(existingUser);

    if (!existingUser) {
      console.error("User not found in DB with ID:", user.id);
      return res.status(404).json({ error: "User not found." });
    }

    const quotation = new Quotation({
      user: user.id,
      products,
      totalPrice,
    });

    const savedQuotation = await quotation.save();

    existingUser.QuotationPages.push(savedQuotation._id);
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "Quotation details saved successfully.",
      quotationId: savedQuotation._id,
    });
  } catch (error) {
    console.error("Error saving quotation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;

// Route to fetch all quotations with pagination, search, and date range
router.get("/quotations", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    // Build the search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { phoneNo: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Find all users matching the search query
    const users = await Users.find(
      searchQuery,
      "name email phoneNo QuotationPages"
    );

    // Flatten and map the quotations with user details
    let allQuotations = users.flatMap((user) => {
      return user.QuotationPages.map((quotation) => ({
        userName: user.name,
        phoneNo: user.phoneNo,
        email: user.email,
        uploadedAt: quotation.uploadedAt,
        link: quotation.link,
      }));
    });

    // Filter by date range if provided
    if (startDate && endDate) {
      allQuotations = allQuotations.filter((quotation) => {
        return (
          quotation.uploadedAt >= parseInt(startDate) &&
          quotation.uploadedAt <= parseInt(endDate)
        );
      });
    }

    // Sort quotations by date (newest first)
    allQuotations.sort((a, b) => b.uploadedAt - a.uploadedAt);

    // Apply pagination to the flattened quotations
    const quotations = allQuotations.slice(skip, skip + parseInt(limit));

    // Get the total count of quotations for pagination
    const totalQuotations = allQuotations.length;

        res.status(200).json({
            quotations,
            totalPages: Math.ceil(totalQuotations / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({error: 'Internal server error.'});
    }
});

// To get specific user's quotation
router.get('/quotation/:id', async (req, res) => {
    try {
    const quotationId = req.params.id;

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    return res.status(200).json(quotation);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
})

// To manipulate pricing in quotation
router.put('/quotation/:id/price', async (req, res) => {
  const { price, productId } = req.body;

  if (typeof price !== 'number' || price <= 0 || !productId) {
    return res.status(400).json({ message: 'Invalid input: price or productId' });
  }

  try {
    const quotation = await Quotations.findById(req.params._id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // Find the product in the quotation
    const product = quotation.products.find(p => p._id.toString() === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in quotation' });
    }

    // Update price and totalPrice for the product
    product.price = price;
    const baseAmount = price * product.quantity;
    const taxAmount = (product.Tax / 100) * baseAmount;
    product.totalPrice = baseAmount + taxAmount;

    // Recalculate quotation's totalPrice
    quotation.totalPrice = quotation.products.reduce((sum, p) => sum + (p.totalPrice || 0), 0);

    await quotation.save();

    res.status(200).json({
      message: 'Product price updated successfully in quotation',
      quotation
    });
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
    res.status(200).json({
      quotations,
      totalPages: Math.ceil(totalQuotations / limit),
      currentPage: parseInt(page),
    });
  }
);

module.exports = router;
