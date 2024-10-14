import express from 'express';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS

const app = express();
const PORT = 5173; // Change to any port you want

app.use(bodyParser.json());
app.use(cors());

// Hash generation function
const generateHash = (merchant_id, order_id, amount, currency, merchant_secret) => {
    // Format amount to two decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);
    
    // Create the hash string
    const hashString = `${merchant_id}${order_id}${formattedAmount}${currency}${crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase()}`;
    
    // Generate and return the final hash
    return crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
};

// POST endpoint to generate the hash
app.post('/generate-hash', (req, res) => {
    console.log("Received request:", req.body); // Log to verify request is coming in
    const { merchant_id, order_id, amount, currency, merchant_secret } = req.body;

    // Validate input
    if (!merchant_id || !order_id || !amount || !currency || !merchant_secret) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    
    const hash = generateHash(merchant_id, order_id, amount, currency, merchant_secret);
    res.json({ hash });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
