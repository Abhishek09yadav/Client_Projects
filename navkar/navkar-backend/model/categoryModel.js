// categoryModel.js
const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// Export the Category model
module.exports = mongoose.model('Category', CategorySchema);
