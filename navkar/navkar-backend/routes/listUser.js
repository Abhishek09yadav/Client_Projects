const express = require('express');
const router = express.Router();
const Users = require('../models/models');

router.get('/listUser', async (req, res) => {
    try {
        const {search, page = 1, limit = 5} = req.query;
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query = {
                $or: [
                    {name: {$regex: search, $options: 'i'}},
                    {email: {$regex: search, $options: 'i'}},
                    {phoneNo: {$regex: search, $options: 'i'}}
                ]
            };
        }

        const usersData = await Users.find(query).skip(skip).limit(parseInt(limit));
        const totalUsers = await Users.countDocuments(query);

        if (usersData.length === 0) {
            return res.status(404).json({success: false, error: "No users found"});
        }

        const usersDetailsToSend = usersData.map(user => {
            const {password, ...userDetails} = user.toObject();
            return userDetails;
        });

        res.json({
            success: true,
            usersDetails: usersDetailsToSend,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error("Error fetching users details:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
});

module.exports = router;