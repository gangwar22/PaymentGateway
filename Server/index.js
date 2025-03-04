const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const UPI_ID = process.env.UPI_ID || "7055648508@ibl"; // Replace with actual UPI ID

app.post("/generate-upi-link", (req, res) => {
  const { provider, amount } = req.body;

  if (!provider || !amount) {
    return res.status(400).json({ error: "Provider and amount are required" });
  }

  const payeeName = "Your Business";
  const transactionId = "ORDER" + Date.now();

  const deepLinks = {
    paytm: `upi://pay?pa=${UPI_ID}&pn=${payeeName}&mc=&tid=${transactionId}&tr=${transactionId}&tn=Payment&am=${amount}&cu=INR`,
    gpay: `upi://pay?pa=${UPI_ID}&pn=${payeeName}&tid=${transactionId}&tr=${transactionId}&tn=Payment&am=${amount}&cu=INR`,
    phonepe: `upi://pay?pa=${UPI_ID}&pn=${payeeName}&mc=&tid=${transactionId}&tr=${transactionId}&tn=Payment&am=${amount}&cu=INR`,
  };

  const paymentUrl = deepLinks[provider];

  if (!paymentUrl) {
    return res.status(400).json({ error: "Invalid Payment Provider" });
  }

  res.json({ paymentUrl });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
