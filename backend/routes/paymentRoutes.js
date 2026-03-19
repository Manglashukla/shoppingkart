import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { isAuthenticatedUser } from "../middleware/auth.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

dotenv.config();

const router = express.Router();

// ✅ Stripe initialization with sanitized secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.trim() : "");

// GET /api/v1/stripeapikey
router.get("/stripeapikey", isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.REACT_APP_STRIPE_API_KEY });
}));

// POST /api/v1/create-payment-intent
router.post("/create-payment-intent", isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
  const { total } = req.body;

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid total amount" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100), // Convert to smallest currency unit (paise for INR)
    currency: "inr",
    metadata: {
      integration_check: "accept_a_payment",
    },
  });

  res.status(200).json({ 
    success: true,
    clientSecret: paymentIntent.client_secret 
  });
}));

export default router;
