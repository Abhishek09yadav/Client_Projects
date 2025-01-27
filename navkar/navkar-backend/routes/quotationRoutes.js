// quotationRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('../models/models');

const baseUrl = process.env.BASE_URL;

// PDF storage engine
const pdfStorage = multer.diskStorage({
    destination: './upload/pdf', // Save PDFs in the pdf folder
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Use only the timestamp for simplicity
        cb(null, `${file.fieldname}_${Date.now()}.pdf`);
    }
});

// Configure multer for PDF uploads
const uploadPdf = multer({
    storage: pdfStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Route to upload a quotation
router.post('/uploadQuotation', uploadPdf.single('quotation'), async (req, res) => {
    const {userId} = req.body;

    if (!userId || !req.file) {
        return res.status(400).json({error: "User ID and PDF file are required."});
    }

    try {
        // Find the user in MongoDB
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({error: "User not found."});
        }

        // Create a public link for the uploaded PDF
        const pdfLink = `${baseUrl}/uploads/pdf/${req.file.filename}`;
        const timestamp = Date.now();

        // Save the link and timestamp in the user's QuotationPages array
        user.QuotationPages.push({link: pdfLink, uploadedAt: timestamp});
        await user.save();

        res.status(200).json({
            success: true,
            message: "Quotation saved successfully.",
            pdfLink,
            uploadedAt: timestamp
        });
    } catch (error) {
        console.error("Error uploading quotation:", error);
        res.status(500).json({error: "Internal server error."});
    }
});

// Route to fetch all quotations with pagination and search
router.get('/quotations', async (req, res) => {
    try {
        const {page = 1, limit = 10, search = ''} = req.query;
        const skip = (page - 1) * limit;

        // Build the search query
        const searchQuery = search ? {
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {phoneNo: {$regex: search, $options: 'i'}}
            ]
        } : {};

        // Find all users and populate quotations with search and pagination
        const users = await Users.find(searchQuery, 'name phoneNo QuotationPages')
            .skip(skip)
            .limit(parseInt(limit));

        // Flatten and map the quotations with user details
        const quotations = users.flatMap(user => {
            return user.QuotationPages.map(quotation => ({
                userName: user.name,
                phoneNo: user.phoneNo,
                uploadedAt: quotation.uploadedAt,
                link: quotation.link
            }));
        });

        // Sort quotations by date (newest first)
        quotations.sort((a, b) => b.uploadedAt - a.uploadedAt);

        // Get the total count of users for pagination
        const totalUsers = await Users.countDocuments(searchQuery);

        res.status(200).json({
            quotations,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({error: 'Internal server error.'});
    }
});

module.exports = router;