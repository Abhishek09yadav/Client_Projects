const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('../models/models');

router.get('/listUser', async (req, res) => {
    try {
        // Find all users
        const usersData = await Users.find({});
        if (usersData.length === 0) {
            return res.status(404).json({success: false, error: "No users found"});
        }

        // Exclude the password from each user data
        const usersDetailsToSend = usersData.map(user => {
            const {password, ...userDetails} = user.toObject();
            return userDetails;
        });

        res.json({success: true, usersDetails: usersDetailsToSend});
    } catch (error) {
        console.error("Error fetching users details:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
});

module.exports = router;