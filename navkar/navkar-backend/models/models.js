// models/User.js
const mongoose = require('mongoose');

// Schema for Users
const Users = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    state: {type: String},
    city: {type: String},
    phoneNo: {type: String},
    date: {type: Date, default: Date.now},
    QuotationPages: {type: [String], default: []}
});

// Create and export the User model
module.exports = mongoose.model('Users', Users);
