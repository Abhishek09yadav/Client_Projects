        require('dotenv').config();
        const port = process.env.PORT;
        const baseUrl = process.env.BASE_URL;
        const mongourl = process.env.MONGODB_URI;
        const express = require('express');
        const app = express();
        const mongoose = require('mongoose');

        const path = require('path');
        const cors = require('cors');
        app.use(cors());
        app.use(express.json());


        // Database Connection with MongoDB
        mongoose.connect(mongourl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        }).then(() => console.log("Connected to MongoDB",mongourl))
            .catch(err => console.error("Could not connect to MongoDB", err));

        const formSchema = new mongoose.Schema({
                name: String,
                email: String,
                mobile: String,
                address: String,
                services: String,
                pickup_date: String,
                pickup_time: String,
                Date: { type: Date, default: Date.now }

        });

        const Form = mongoose.model('DhobiForm', formSchema);

        app.get("/", (req, res) => {
            res.send("Welcome to TheDhobi!");
        })
        app.post("/submitform", async(req, res) => {
        const formDetails = req.body;
        // cons
        try{
        const form = new Form(formDetails);
        const savedForm = await form.save();
        res.status(201).json(savedForm)
        }
        catch (error){
        res.status(400).json({error:error.message});

        }});
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

                        const forms = await Form.find(query || null) // If query is empty, pass null
                            .sort({ pickup_date: -1 }) // Sort by pickup_date in descending order
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


        app.listen(port,()=>{
        console.log(`Server running at ${baseUrl}:  ${port}`);
})



