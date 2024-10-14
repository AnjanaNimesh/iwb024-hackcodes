const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel'); // Ensure path is correct

// POST donation
router.post('/', async (req, res) => {
    const { amount, first_name, last_name, email } = req.body;

    try {
        const newDonation = new Donation({ amount, first_name, last_name, email });
        await newDonation.save();
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
