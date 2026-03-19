// src/pages/Payment.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const info = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (info) {
      setOrderInfo(info);
    } else {
      console.error("❌ No order info found in session storage");
      navigate("/cart");
    }
  }, [navigate]);

  useEffect(() => {
    if (orderInfo && orderInfo.totalPrice) {
      const createPaymentIntent = async () => {
        try {
          const { data } = await axios.post("/create-payment-intent", { 
            total: orderInfo.totalPrice 
          });
          console.log("✅ Payment Intent Created:", data.clientSecret);
          setClientSecret(data.clientSecret);
        } catch (err) {
          const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
          console.error("❌ Failed to create payment intent:", errMsg);
          alert("Stripe Error: " + errMsg);
        }
      };
      createPaymentIntent();
    }
  }, [orderInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      console.warn("⚠️ Stripe elements or client secret not ready");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: "IN",
          },
        },
      },
    });

    if (error) {
      console.error("❌ Stripe Confirmation Error:", error.message);
      alert("Payment failed: " + error.message);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("✅ Payment Succeeded, saving order...");
        try {
          await axios.post("/orders/new", {
            shippingInfo,
            orderItems: cartItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.qty,
              image: item.image,
              product: item.product,
            })),
            paymentInfo: {
              id: paymentIntent.id,
              status: paymentIntent.status,
            },
            itemsPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
          });
          
          sessionStorage.removeItem("orderInfo");
          navigate("/order/success");
        } catch (err) {
          const errMsg = err.response?.data?.message || err.message;
          console.error("❌ Order Creation Failed:", errMsg);
          alert("Order saving failed: " + errMsg);
          setLoading(false);
        }
      } else {
        alert("There's some issue while processing payment ");
        setLoading(false);
      }
    }
  };

  if (!orderInfo) return <div className="loadingText">Loading order details...</div>;

  return (
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={handleSubmit}>
        <h2 className="paymentHeading">💳 Card Information</h2>
        
        <div className="paymentInputGroup">
          <label>Card Number</label>
          <div className="stripeInput">
            <CardNumberElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>

        <div className="paymentInputGroup">
          <label>Expiry Date</label>
          <div className="stripeInput">
            <CardExpiryElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>

        <div className="paymentInputGroup">
          <label>CVC</label>
          <div className="stripeInput">
            <CardCvcElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          className="paymentBtn"
        >
          {loading ? "Processing..." : `Pay ₹${orderInfo.totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get("/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
      } catch (err) {
        console.error("❌ Failed to fetch Stripe API key", err);
      }
    };
    getStripeApiKey();
  }, []);

  if (!stripeApiKey) return <div className="loadingText">Connecting to Payment Gateway...</div>;

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
