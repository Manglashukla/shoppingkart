import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default Success;
