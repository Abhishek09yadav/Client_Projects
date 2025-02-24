import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import Form from './models/Form.models.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Retrieve environment variables
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection with MongoDB
const conn = await mongoose.connect(process.env.MONGODB_URI);
console.log( `MongoDB connected: ${conn.connection.host}` );

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to TheDhobi!" });
});

app.post("/submitform", async (req, res) => {
    const formDetails = req.body;
    try {
        const form = new Form(formDetails);
        const savedForm = await form.save();
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/submittedforms', async (req, res) => {
    const { page = 1, limit = 10, search = '', date } = req.query;

    try {
        const query = {
            ...(search ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { mobile: { $regex: search, $options: 'i' } },
                    { services: { $regex: search, $options: 'i' } },
                ],
            } : null),
            ...(date && {
                pickup_date: {
                    $eq: new Date(date).toLocaleDateString('en-CA') // Format as YYYY-MM-DD
                }
            }),
        };

        const forms = await Form.find(query || null)
            .sort({ pickup_date: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Form.countDocuments(query || null);

        res.status(200).json({
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            forms,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at ${baseUrl}: ${port}`);
});