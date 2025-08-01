import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Use Stripe secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/v1/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { total } = req.body;

    if (!total || total <= 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // ₹999 → 99900 paise
      currency: "inr",
      metadata: {
        integration_check: "accept_a_payment",
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
