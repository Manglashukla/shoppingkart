// src/pages/Payment.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Rqsc22M2orwRicAB2vfm6wR7RONhJuO8H2TLTtgSEuyNFBzraMUPtiR4GpuPKLg3Vbb4iBYofJQVdOSSeAFa79W00NLjgMH1x");

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post("/create-payment-intent", { total });
        setClientSecret(data.clientSecret);
        console.log("✅ clientSecret:", data.clientSecret);
      } catch (err) {
        console.error("❌ Failed to create payment intent", err);
      }
    };
    createPaymentIntent();
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: shippingInfo?.address || "Anonymous",
        },
      },
    });

    if (error) {
      console.error("Payment failed", error);
      alert("Payment failed: " + error.message);
      setLoading(false);
    } else {
      console.log("Payment successful", paymentIntent);
      alert("Payment successful!");

      // ✅ Save order to backend
      try {
        await axios.post("/api/v1/orders", {
          shippingInfo,
          orderItems: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.qty,
            product: item.product,
          })),
          paymentInfo: {
            id: paymentIntent.id,
            status: paymentIntent.status,
          },
          itemsPrice: total,
          totalPrice: total,
        });
        console.log("✅ Order saved to database");
      } catch (err) {
        console.error("❌ Failed to save order:", err);
      }

      navigate("/success");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💳 Payment</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement />
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
