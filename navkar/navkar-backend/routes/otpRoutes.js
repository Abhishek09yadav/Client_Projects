// otpRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Users = require('../models/models');
const cors = require('cors');
const jwt = require("jsonwebtoken");
router.use(express.json())
router.use(cors());
// OTP storage
const otpStore = {};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Utility functions
function generateOTP() {
    return crypto.randomInt(1000, 9999).toString();
}

async function sendOTPEmail(email, otp, subject, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message,
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
}

// Request OTP endpoint
router.post('/request-otp', async (req, res) => {
    const {email} = req.body;
    const existingUser = await Users.findOne({email});
    if (existingUser) {
        return res.status(400).json({success: false, error: 'Email already registered'});
    }
    const otp = generateOTP();
    otpStore[email] = {otp, createdAt: Date.now()};
    const otpSent = await sendOTPEmail(
        email,
        otp,
        'Your OTP for Signup',
        `Your One-Time Password (OTP) is: ${otp}. This OTP will expire in 10 minutes.`
    );
    if (otpSent) {
        res.json({success: true, message: 'OTP sent to your email'});
    } else {
        res.status(500).json({success: false, error: 'Failed to send OTP'});
    }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
    const {email, otp, username, password, state, city, phoneNo} = req.body;
    const storedOTP = otpStore[email];
    if (!storedOTP) {
        return res.status(400).json({success: false, error: 'No OTP request found'});
    }
    // Check OTP expiration (10 minutes)
    if (Date.now() - storedOTP.createdAt > 10 * 60 * 1000) {
        delete otpStore[email];
        return res.status(400).json({success: false, error: 'OTP has expired'});
    }

    // Validate the OTP
    if (storedOTP.otp !== otp) {
        return res.status(400).json({success: false, error: 'Invalid OTP'});
    }

    try {
        // Save user to database
        const user = new Users({
            name: username,
            email,
            password,
            state,
            city,
            phoneNo,
        });

        await user.save();

        // Generate JWT token
        const payload = {user: {id: user._id}};
        const token = jwt.sign(payload, 'secret_ecom');

        // Clean up OTP storage
        delete otpStore[email];

        // Respond with success and token
        res.json({success: true, message: 'Signup successful', token});
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({success: false, error: 'Signup failed'});
    }
});

// Forgot Password OTP endpoint
router.post('/forgot-password-otp', async (req, res) => {
    const {email} = req.body;
    const existingUser = await Users.findOne({email});
    if (!existingUser) {
        return res.status(400).json({success: false, error: 'Email not registered'});
    }
    const otp = generateOTP();
    otpStore[email] = {otp, createdAt: Date.now(), type: 'forgot_password'};
    const otpSent = await sendOTPEmail(
        email,
        otp,
        'Password Reset OTP',
        `Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes.`
    );
    if (otpSent) {
        res.json({success: true, message: 'Password reset OTP sent to your email'});
    } else {
        res.status(500).json({success: false, error: 'Failed to send OTP'});
    }
});
// Endpoint to reset password
router.post('/reset-password', async (req, res) => {
    const {email, otp, newPassword} = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore[email];

    if (!storedOTP) {
        return res.status(400).json({
            success: false,
            error: 'No OTP request found'
        });
    }

    // Check if this is a forgot password OTP
    if (storedOTP.type !== 'forgot_password') {
        return res.status(400).json({
            success: false,
            error: 'Invalid OTP request'
        });
    }

    // Check OTP expiration (10 minutes)
    const currentTime = Date.now();
    if (currentTime - storedOTP.createdAt > 10 * 60 * 1000) {
        delete otpStore[email];
        return res.status(400).json({
            success: false,
            error: 'OTP has expired'
        });
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
        return res.status(400).json({
            success: false,
            error: 'Invalid OTP'
        });
    }

    try {
        // Find the user by email
        const user = await Users.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update user's password
        user.password = newPassword;
        await user.save();

        // Remove OTP from store
        delete otpStore[email];

        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset password'
        });
    }
});
router.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {user: {id: user.id}}
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token})
        } else {
            res.json({success: false, error: 'Wrong password'})
        }
    } else {
        res.json({success: false, error: "Wrong Email id"})
    }
})
router.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({success: false, error: 'Email already exists'});
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        phoneNo: req.body.phoneNo,

    });

    await user.save();

    const data = {user: {id: user._id}};
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token});
});

module.exports = router;
