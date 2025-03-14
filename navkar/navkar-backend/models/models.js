// models/User.js
const mongoose = require('mongoose');

// Schema for Users
const Users = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    state: {type: String, required: true},
    city: {type: String, required: true},
    phoneNo: {type: String, required: true},
    date: {type: Date, default: Date.now},
    QuotationPages: {
        type: [{link: String, uploadedAt: Number}],
        default: []
    }
});

// Create and export the User model
module.exports = mongoose.model('Users', Users);
