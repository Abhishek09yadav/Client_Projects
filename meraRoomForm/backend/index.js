import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Form from './models/Form.models.js';
import ExcelRoute from './routes/downloadExcel.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to meraRoom!" });
});

app.use('/api', ExcelRoute);

app.post("/submitHostelAgreement", async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const form = new Form(req.body);
        const savedForm = await form.save();
        res.status(201).json(savedForm);
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/submittedforms', async (req, res) => {
    const { page = 1, limit = 10, search = '', date } = req.query;
    try {
        const query = {
            ...(search ? {
                $or: [
                    { studentName: { $regex: search, $options: 'i' } },
                    { whatsapp: { $regex: search, $options: 'i' } },
                    { guardianName: { $regex: search, $options: 'i' } },
                    { guardianPhone: { $regex: search, $options: 'i' } },
                    { hostelName: { $regex: search, $options: 'i' } },
                    // { course: { $regex: search, $options: 'i' } },
                ],
            } : {}),
            ...(date ? {
                BookingDate: {
                    $gte: new Date(date).setHours(0, 0, 0, 0),
                    $lt: new Date(date).setHours(23, 59, 59, 999),
                },
            } : {}),
        };

        const forms = await Form.find(query)
            .sort({ BookingDate: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Form.countDocuments(query);

        res.status(200).json({
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            forms,
        });
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at ${baseUrl}`);
});
