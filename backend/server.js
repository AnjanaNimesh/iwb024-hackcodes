const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const donationRoutes = require('./routes/donations'); // Make sure this path is correct

const app = express();
const PORT = 5173;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/donations', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api/donations', donationRoutes); // Register donation routes

// Start server
app.listen(PORT, () => {
    console.log(`Node.js server is running on http://localhost:${PORT}`);
});
