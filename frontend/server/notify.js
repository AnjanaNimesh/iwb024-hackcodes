import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/payment-notify", (req, res) => {
    console.log("Payment notification received:", req.body);

    // Process the payment details here, like verifying payment status, order ID, etc.
    // For example, check if req.body.status is "2" (completed)

    // Respond to PayHere
    res.status(200).send("Payment notification received successfully");
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
