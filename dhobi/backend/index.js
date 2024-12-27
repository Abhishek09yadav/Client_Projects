        require('dotenv').config();
        const port = process.env.PORT;
        const baseUrl = process.env.BASE_URL;

        const express = require('express');
        const app = express();
        const mongoose = require('mongoose');

        const path = require('path');
        const cors = require('cors');
        app.use(express.json());
        app.use(cors());


        // Database Connection with mongodb
        mongoose.connect('mongodb://localhost:27017/dhobi-forum')

        app.get("/", (req, res) => {
            res.send("Welcome to Ecommerce!");
        })




