// navkar backend backup
require('dotenv').config();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(cors());

const otpRoutes = require('./routes/otpRoutes');
app.use('/api/otp', otpRoutes);
// Database Connection with mongodb
mongoose.connect('mongodb+srv://Ecommerce:Z1*6$5*7A4$qC&@cluster0.dwmcu.mongodb.net/e-commerce')

app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce!");
})
const Users = require('./models/models');


// Image storage Engine
const imagesStorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);

    }
})
const upload = multer({storage: imagesStorage});

// creating upload
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `${baseUrl}/images/${req.file.filename}`,
    });
});
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
const Banner = mongoose.model("Banner", {
    id: {
        type: Number,
        required: true,
        default: 123,
        unique: true
    },
    image: {type: String, required: false},
    image1: {type: String, required: false},
    image2: {type: String, required: false},
    image3: {type: String, required: false},
});
app.get('/banners', async (req, res) => {
    try {
        // Check if a banner with id 123 exists
        let banner = await Banner.findOne({id: 123});

        // If it doesn't exist, create a new one with id 123
        if (!banner) {
            banner = new Banner({id: 123});
            await banner.save();
            // console.log('Created new banner with id 123');
        }

        // Fetch all banners
        const banners = await Banner.find();
        res.status(200).json(banners);

    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({error: 'Failed to fetch banners.'});
    }
});


app.put('/banners/:id', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
]), async (req, res) => {
    const {id} = req.params;

    try {
        const banner = await Banner.findOne({id});
        if (!banner) {
            return res.status(404).json({error: 'Banner not found.'});
        }

        // Update or clear image fields based on FormData
        ['image', 'image1', 'image2', 'image3'].forEach((key) => {
            if (req.body[key] === '') {
                // Clear the image field if empty string is sent
                banner[key] = '';
            } else if (req.files[key]) {
                // Update the field with the new file
                banner[key] = `${baseUrl}/images/${req.files[key][0].filename}`;
            }
            // If neither an empty string nor a file is provided, retain the existing value
        });

        await banner.save();
        res.status(200).json({success: true, banner});
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({error: 'Failed to update banner.'});
    }
});


app.post('/uploadQuotation', uploadPdf.single('quotation'), async (req, res) => {
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
// Endpoint to fetch all quotations
app.get('/quotations', async (req, res) => {
    try {
        // Find all users and populate quotations
        const users = await Users.find({}, 'name phoneNo QuotationPages');

        // Flatten and map the quotations with user details
        const quotations = users.flatMap(user => {
            return user.QuotationPages.map(quotation => ({
                userName: user.name,
                phoneNo: user.phoneNo,
                uploadedAt: quotation.uploadedAt,
                link: quotation.link
            }));
        });

        // Send sorted quotations (newest first)
        quotations.sort((a, b) => b.uploadedAt - a.uploadedAt);
        res.status(200).json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({error: 'Internal server error.'});
    }
});
// Serve static files from the uploads directory
app.use('/uploads', express.static('upload'));

// schema for category
const ProductCategory = mongoose.model("Category", {
    id: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    date: {type: Date, default: Date.now},

})
// Route to Fetch All Categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await ProductCategory.find({}, 'id category'); // Fetch 'id' and 'category'
        res.status(200).json(categories);
        // console.log("Categories fetched:", categories);
    } catch (error) {
        res.status(500).json({error: 'Error fetching categories'});
    }
});

// Route to Add a Category
app.post('/addcategory', async (req, res) => {
    try {
        const {category} = req.body;
        if (!category) return res.status(400).json({error: 'Category is required'});

        const exists = await ProductCategory.exists({category});
        if (exists) return res.status(400).json({error: 'Category already exists'});

        const lastProduct = await ProductCategory.findOne().sort({id: -1});
        const id = lastProduct ? lastProduct.id + 1 : 1;

        const newCategory = await ProductCategory.create({id, category});
        res.status(201).json({success: true, category: newCategory});
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({error: 'Error adding category'});
    }
});

// Route to Remove a Category and its Associated Products
app.delete('/categories/:id', async (req, res) => {
    try {
        const {id} = req.params; // Extract the category ID from request parameters

        // Fetch the category using its ID
        const category = await ProductCategory.findOne({id});
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }

        // Delete all products associated with the category
        await Product.deleteMany({category: category.category});

        // Then delete the category itself
        await ProductCategory.findOneAndDelete({id});

        res.status(200).json({message: 'Category and associated products removed successfully'});
    } catch (error) {
        console.error('Error removing category:', error);
        res.status(500).json({error: 'Error removing category'});
    }
});
app.get('/products/:category', async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({category: category});
    res.json(products);
});

// schema for creating product
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    image: {type: String, required: true},
    image1: {type: String, required: false},
    image2: {type: String, required: false},
    image3: {type: String, required: false},
    category: {type: String, required: true},
    new_price: {type: Number, required: true},
    old_price: {type: Number, required: true},
    Tax: {type: Number, required: true},
    Description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    available: {type: Boolean, default: true},
    MOQ: {type: Number, required: true},
})


const validateAndConvertProduct = (data) => {
    try {
        return {
            name: String(data.name),
            category: String(data.category),
            new_price: Number(data.new_price),
            old_price: Number(data.old_price),
            Tax: data.Tax ? Number(data.Tax) : 0,
            Description: String(data.Description || ""),
            MOQ: Number(data.MOQ),
            image: String(data.image || ""),
            image1: String(data.image1 || ""),
            image2: String(data.image2 || ""),
            image3: String(data.image3 || "")
        };
    } catch (error) {
        throw new Error(`Data validation failed: ${error.message}`);
    }
};

// Replace your existing addProduct endpoint with this updated version
app.post('/addProduct', async (req, res) => {
    try {
        // Validate required fields
        const {name, category, new_price, old_price, MOQ} = req.body;

        if (!name || !category || !new_price || !old_price || !MOQ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                required: ["name", "category", "new_price", "old_price", "MOQ"],
                received: req.body
            });
        }

        // Convert and validate the data
        const validatedData = validateAndConvertProduct(req.body);

        // Get the next available ID
        let products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // Create new product with validated data
        const product = new Product({
            id,
            ...validatedData
        });

        // Save the product
        await product.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            productId: id,
            product: product
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to add product',
            error: error.message,
            receivedData: req.body
        });
    }
});
// Creating api for deleting product
app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id,});
    // console.log('removed')
    res.json({success: true, name: req.body.name, message: 'Product removed'});
})
// Creating api for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find().sort({date: -1}); // Sort by date in descending order
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({success: false, message: 'Failed to fetch products.'});
    }
});

// Endpoint to Edit an Existing Product
app.put('/editProduct/:id', async (req, res) => {
    try {
        const {id} = req.params; // Get product ID from URL parameters
        const updateData = req.body; // Get updated data from the request body

        // Find the product by ID and update it
        const updatedProduct = await Product.findOneAndUpdate({id: id}, updateData, {new: true});

        if (!updatedProduct) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        res.status(200).json({success: true, message: "Product updated successfully", updatedProduct});
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({success: false, message: "Internal server error", error: error.message});
    }
});
//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({success: false, error: 'No token provided'});
    } else {
        try {
            console.log("Token received:", token); // Log the token
            const data = jwt.verify(token, 'secret_ecom');
            console.log("Decoded token data:", data); // Log the decoded token
            req.user = data.user;
            next();
        } catch (e) {
            console.error("Token verification failed:", e); // Log the error
            res.status(401).send({success: false, error: 'token validation failed'});
        }
    }
};
// Endpoint to get user details

app.get('/listUser', async (req, res) => {
    try {
        // Find all users
        const usersData = await Users.find({});
        if (usersData.length === 0) {
            return res.status(404).json({success: false, error: "No users found"});
        }

        // Exclude the password from each user data
        const usersDetailsToSend = usersData.map(user => {
            const {password, ...userDetails} = user.toObject(); // Exclude password
            return userDetails;
        });

        res.json({success: true, usersDetails: usersDetailsToSend});
    } catch (error) {
        console.error("Error fetching users details:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
});

app.delete('/removeUser', async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({success: false, error: "Email is required"});
        }

        // Find the user by email and remove them
        const userToRemove = await Users.findOneAndDelete({email});
        if (!userToRemove) {
            return res.status(404).json({success: false, error: "User not found"});
        }

        res.json({success: true, message: "User removed successfully"});
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
});
// Creating endpoint for registering the user

app.listen(port, (error) => {
    if (!error) {
        console.log(
            "server running on port " + port
        )
    } else {
        console.log("Error: " + error)
    }
})
// Creating endpoint for user login
app.post('/getUserDetails', fetchUser, async (req, res) => {
    try {
        // Find user by id
        const userData = await Users.findOne({_id: req.user.id});

        if (!userData) {
            return res.status(404).json({success: false, error: "User not found"});
        }

        // Exclude the password from the user data
        const {password, ...userDetailsToSend} = userData.toObject(); // Exclude password
        res.json({success: true, userDetails: userDetailsToSend});
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({success: false, error: "Internal server error"});
    }
});


app.get('/newCollection', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(-8);
    // console.log("newCollection", newCollection);
    res.send(newCollection);
})

// API to fetch products by category
