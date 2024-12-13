// categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../model/categoryModel');

// Add a new category
router.post('/addCategory', async (req, res) => {
    try {
        let categories = await Category.find({});
        let id = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;

        const category = new Category({
            id: id,
            name: req.body.name,
            description: req.body.description || '',
        });

        await category.save();
        res.json({
            success: true,
            message: 'Category added successfully',
            categoryId: category.id,
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding category',
            error: error.message,
        });
    }
});

// Fetch all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
    }
});

// Delete a category
router.post('/removeCategory', async (req, res) => {
    try {
        await Category.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, message: 'Category removed successfully' });
    } catch (error) {
        console.error('Error removing category:', error);
        res.status(500).json({ success: false, message: 'Error removing category' });
    }
});

module.exports = router;
