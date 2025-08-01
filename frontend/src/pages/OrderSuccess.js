import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="orderSuccessContainer">
      <div className="orderSuccessBox">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Your payment was successful and your order has been placed.</p>
        <Link to="/orders">View My Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
