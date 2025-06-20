// quotationRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Users = require("../models/models");
const Quotation = require('../models/Quotation');
const Product = require('../index');
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
      user: existingUser._id,
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
// Route to fetch all quotations with pagination, search, and date range
router.get("/quotations", async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "", startDate, endDate } = req.query;
      const skip = (page - 1) * limit;
  
      // Build filter object
      const filter = {};
  
      // Add search on user details
      if (search) {
        const users = await Users.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { phoneNo: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ]
        }).select("_id");
  
        const userIds = users.map(user => user._id);
        filter.user = { $in: userIds };
      }
  
      // Add date filtering
      if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(parseInt(startDate)),
          $lte: new Date(parseInt(endDate))
        };
      }
  
      // Query Quotation with population of user details
      const quotations = await Quotation.find(filter)
        .populate("user", "name email phoneNo") // Get user info
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(parseInt(limit));
  
      const totalQuotations = await Quotation.countDocuments(filter);
  
      // Format output
      const formatted = quotations.map(q => ({
        userName: q.user?.name,
        phoneNo: q.user?.phoneNo,
        email: q.user?.email,
        uploadedAt: q.createdAt,
        id: q._id,
      }));
  
      res.status(200).json({
        quotations: formatted,
        totalPages: Math.ceil(totalQuotations / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      console.error('Error fetching quotations:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
// Get all quotations for a specific user by user ID
router.get('/quotation/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format.' });
    }
  
    try {
      const quotations = await Quotation.find({ user: userId })
        .select('_id createdAt Status')
        .sort({ createdAt: -1 }); 
  
      if (!quotations || quotations.length === 0) {
        return res.status(404).json({ message: 'No quotations found for this user.' });
      }
  
      const formatted = quotations.map(q => ({
        quotationId: q._id,
        date: q.createdAt,
        status: q.Status
      }));
  
      res.status(200).json({
        userId,
        quotations: formatted
      });
    } catch (error) {
      console.error('Error fetching user quotations:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
// To get specific user's quotation
router.get('/quotation/:id', async (req, res) => {
    try {
    const quotationId = req.params.id;

    const quotation = await Quotation.findById(quotationId);
    // console.log("quotation -> ",quotation)

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
router.put("/quotation/prices/:id", async (req, res) => {
  const { updates } = req.body; // expects an array: [{ productId, price }, ...]

  if (!Array.isArray(updates) || updates.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input: updates array required" });
  }

  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // Track update status
    let updatedCount = 0;

    updates.forEach(({ productId, price }) => {
      if (typeof price !== "number" || price <= 0 || !productId) return;

      const product = quotation.products.find(
        (p) => p._id.toString() === productId
      );
      if (product) {
        product.price = price;
        const baseAmount = price * product.quantity;
        const taxAmount = (product.Tax / 100) * baseAmount;
        product.totalPrice = baseAmount + taxAmount;
        updatedCount++;
      }
    });

    if (updatedCount === 0) {
      return res
        .status(400)
        .json({ message: "No valid product updates were applied" });
    }

    // Recalculate total quotation price
    quotation.totalPrice = quotation.products.reduce(
      (sum, p) => sum + (p.totalPrice || 0),
      0
    );
    quotation.Status = "Completed";

    await quotation.save();

    res.status(200).json({
      message: `${updatedCount} product(s) updated successfully in quotation`,
      quotation,
    });
  } catch (error) {
    console.error("Error updating quotation:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
