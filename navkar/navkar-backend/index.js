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
        const nodemailer = require('nodemailer');
        const crypto = require('crypto');
        app.use(express.json());
        app.use(cors());


        // Database Connection with mongodb
        mongoose.connect('mongodb+srv://Ecommerce:Z1*6$5*7A4$qC&@cluster0.dwmcu.mongodb.net/e-commerce')

        app.get("/", (req, res) => {
            res.send("Welcome to Ecommerce!");
        })


        // Image storage Engine
        const storage = multer.diskStorage({
            destination: './upload/images',
            filename: (req, file, cb) => {
                return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);

            }
        })
        const upload = multer({storage: storage});



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
                console.log("Categories fetched:", categories);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching categories' });
            }
        });

        // Route to Add a Category
        app.post('/addcategory', async (req, res) => {
            try {
                const { category } = req.body;
                if (!category) return res.status(400).json({ error: 'Category is required' });

                const exists = await ProductCategory.exists({ category });
                if (exists) return res.status(400).json({ error: 'Category already exists' });

                const lastProduct = await ProductCategory.findOne().sort({ id: -1 });
                const id = lastProduct ? lastProduct.id + 1 : 1;

                const newCategory = await ProductCategory.create({ id, category });
                res.status(201).json({ success: true, category: newCategory });
            } catch (error) {
                console.error('Error adding category:', error);
                res.status(500).json({ error: 'Error adding category' });
            }
        });

        // Route to Remove a Category and its Associated Products
        app.delete('/categories/:id', async (req, res) => {
            try {
                const { id } = req.params; // Extract the category ID from request parameters

                // Fetch the category using its ID
                const category = await ProductCategory.findOne({ id });
                if (!category) {
                    return res.status(404).json({ error: 'Category not found' });
                }

                // Delete all products associated with the category
                await Product.deleteMany({ category: category.category });

                // Then delete the category itself
                await ProductCategory.findOneAndDelete({ id });

                res.status(200).json({ message: 'Category and associated products removed successfully' });
            } catch (error) {
                console.error('Error removing category:', error);
                res.status(500).json({ error: 'Error removing category' });
            }
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
            image1: {type: String, required: false}, // Optional images
            image2: {type: String, required: false},
            image3: {type: String, required: false},
            category: {type: String, required: true},
            new_price: {type: Number, required: true},
            old_price: {type: Number, required: true},
            Tax: {type: String, required: true},
            Description: {type: String, required: true},
            date: {type: Date, default: Date.now},
            available: {type: Boolean, default: true},
            MOQ: { type: Number, required: true },
        })

        // Updated Product Creation Endpoint
        app.post('/addProduct', async (req, res) => {
            try {
                const { name, category, new_price, old_price, Tax, Description, moq, image, image1, image2, image3 } = req.body;

                // Validate required fields
                if (!name || !category || !new_price || !old_price || !moq) {
                    return res.status(400).json({ success: false, message: "Missing required fields" });
                }

                let products = await Product.find({});
                const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

                const product = new Product({
                    id,
                    name,
                    category,
                    new_price: Number(new_price),
                    old_price: Number(old_price),
                    Tax: Tax || "", // Default empty string for optional fields
                    Description: Description || "",
                    MOQ: Number(moq),
                    image: image || "", // Default empty string if not provided
                    image1: image1 || "",
                    image2: image2 || "",
                    image3: image3 || "",
                });

                await product.save();
                res.status(201).json({ success: true, message: "Product added successfully", productId: id });
            } catch (error) {
                console.error('Error adding product:', error.message);
                res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
            }
        });

        // Creating api for deleting product
        app.post('/removeProduct', async (req, res) => {
            await Product.findOneAndDelete({id: req.body.id,});
            console.log('removed')
            res.json({success: true, name: req.body.name, message: 'Product removed'});
        })
        // Creating api for getting all products
        app.get('/allproducts', async (req, res) => {
            let products = await Product.find({});
            res.send(products);
            console.log("All products Fetched");
        })

        //Schema creating for use model
        const Users = mongoose.model('Users', {
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            state: { type: String },
            city: { type: String },
            phoneNo: { type: String },

            date: { type: Date, default: Date.now },
        });
        //creating middleware to fetch user
        const fetchUser = async (req, res, next) => {
            const token = req.header('auth-token');
            if (!token) {
                res.status(401).json({success: false, error: 'No token provided'});
            } else {
                try {
                    const data = jwt.verify(token, 'secret_ecom');
                    req.user = data.user;
                    next();
                } catch (e) {
                    res.status(401).send({success: false, error: 'token validation failed'});
                }
            }
        }
        // Endpoint to get user details

        app.get('/listUser', async (req, res) => {
            try {
                // Find all users
                const usersData = await Users.find({});
                if (usersData.length === 0) {
                    return res.status(404).json({ success: false, error: "No users found" });
                }

                // Exclude the password from each user data
                const usersDetailsToSend = usersData.map(user => {
                    const { password,cartData, ...userDetails } = user.toObject(); // Exclude password
                    return userDetails;
                });

                res.json({ success: true, usersDetails: usersDetailsToSend });
            } catch (error) {
                console.error("Error fetching users details:", error);
                res.status(500).json({ success: false, error: "Internal server error" });
            }
        });

        app.post('/removeUser', async (req, res) => {
            try {
                const { email } = req.body; // Get the email from the request body
                if (!email) {
                    return res.status(400).json({ success: false, error: "Email is required" });
                }

                // Find the user by email and remove them
                const userToRemove = await Users.findOneAndDelete({ email });
                if (!userToRemove) {
                    return res.status(404).json({ success: false, error: "User not found" });
                }

                res.json({ success: true, message: "User removed successfully" });
            } catch (error) {
                console.error("Error removing user:", error);
                res.status(500).json({ success: false, error: "Internal server error" });
            }
        });
        // Creating endpoint for registering the user
        app.post('/signup', async (req, res) => {
            let check = await Users.findOne({ email: req.body.email });
            if (check) {
                return res.status(400).json({ success: false, error: 'Email already exists' });
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

            const data = { user: { id: user._id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        });

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
        app.post('/login', async (req, res) => {
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
        app.post('/getUserDetails', fetchUser, async (req, res) => {
            try {
                // Find user by id
                const userData = await Users.findOne({_id: req.user.id});

                if (!userData) {
                    return res.status(404).json({success: false, error: "User not found"});
                }

                // Exclude the password from the user data
                const { password, ...userDetailsToSend } = userData.toObject(); // Exclude password
                res.json({success: true, userDetails: userDetailsToSend});
            } catch (error) {
                console.error("Error fetching user details:", error);
                res.status(500).json({success: false, error: "Internal server error"});
            }
        });
        // OTP storage to track generated OTPs
        let otpStore = {};

        // Nodemailer transporter configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'monuy8830@gmail.com',
                pass: 'vljwjnavutkxfqyu',
            }
        });
        function generateOTP() {
            return crypto.randomInt(1000, 9999).toString();
        }
        // Function to send OTP via email
        async function sendOTPEmail(email, otp) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP for Signup',
                text: `Your One-Time Password (OTP) is: ${otp}. 
        This OTP will expire in 10 minutes. 
        Do not share this with anyone.`
            };

            try {
                await transporter.sendMail(mailOptions);
                return true;
            } catch (error) {
                console.error('Error sending OTP email:', error);
                return false;
            }
        }

        // Endpoint to request OTP
        app.post('/request-otp', async (req, res) => {
            const { email } = req.body;

            // Check if email already exists
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already registered'
                });
            }

            // Generate OTP
            const otp = generateOTP();

            // Store OTP with timestamp
            otpStore[email] = {
                otp,
                createdAt: Date.now()
            };

            // Send OTP via email
            const otpSent = await sendOTPEmail(email, otp);

            if (otpSent) {
                res.json({
                    success: true,
                    message: 'OTP sent to your email'
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'Failed to send OTP'
                });
            }
        });

        // Endpoint to verify OTP and complete signup
        app.post('/verify-otp', async (req, res) => {
            const { email, otp, username, password, state, city, phoneNo } = req.body;

            // Check if OTP exists and is valid
            const storedOTP = otpStore[email];

            if (!storedOTP) {
                return res.status(400).json({
                    success: false,
                    error: 'No OTP request found'
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

            // Create new user
            const user = new Users({
                name: username,
                email,
                password,
                state,
                city,
                phoneNo,
            });

            try {
                await user.save();

                // Generate token
                const data = { user: { id: user._id } };
                // const token = jwt.sign(data, 'secret_ecom');

                // Remove OTP from store
                delete otpStore[email];

                res.json({
                    success: true,
                    // token
                });
            } catch (error) {
                console.error('Signup error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Signup failed'
                });
            }
        });

        // Optional: Clean up expired OTPs periodically
        setInterval(() => {
            const currentTime = Date.now();
            Object.keys(otpStore).forEach(email => {
                if (currentTime - otpStore[email].createdAt > 10 * 60 * 1000) {
                    delete otpStore[email];
                }
            });
        }, 5 * 60 * 1000); // Run every 5 minutes
        // Endpoint to request forgot password OTP
        app.post('/forgot-password-otp', async (req, res) => {
            const { email } = req.body;

            // Check if email exists in the database
            const existingUser = await Users.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({
                    success: false,
                    error: 'Email not registered'
                });
            }

            // Generate OTP
            const otp = generateOTP();

            // Store OTP with timestamp
            otpStore[email] = {
                otp,
                createdAt: Date.now(),
                type: 'forgot_password'
            };

            // Send OTP via email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP',
                text: `Your One-Time Password (OTP) for password reset is: ${otp}. 
This OTP will expire in 10 minutes. 
Do not share this with anyone.`
            };

            try {
                await transporter.sendMail(mailOptions);
                res.json({
                    success: true,
                    message: 'Password reset OTP sent to your email'
                });
            } catch (error) {
                console.error('Error sending password reset OTP:', error);
                res.status(500).json({
                    success: false,
                    error: 'Failed to send OTP'
                });
            }
        });

        // Endpoint to reset password
        app.post('/reset-password', async (req, res) => {
            const { email, otp, newPassword } = req.body;

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
                const user = await Users.findOne({ email });

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
        app.get('/newCollection', async (req, res) => {
            let products = await Product.find({});
            let newCollection = products.slice(-8);
            console.log("newCollection", newCollection);
            res.send(newCollection);
        })

        // API to fetch products by category
        app.get('/products/:category', async (req, res) => {
            const category = req.params.category;
            const products = await Product.find({ category: category });
            res.json(products);
        });
        // creating upload
        app.use('/images', express.static('upload/images'));
        app.post("/upload", upload.single("product"), (req, res) => {
            res.json({
                success: 1,
                image_url: `${baseUrl}/images/${req.file.filename}`,
            });
        });