// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// Use your own Stripe publishable key here
export const stripePromise = loadStripe("pk_test_YourPublishableKeyHere");
