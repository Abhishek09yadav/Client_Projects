// quotationRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Users = require("../models/models");
const Quotation = require("../models/Quotation");
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
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
