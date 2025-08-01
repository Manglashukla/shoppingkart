// src/pages/OrderDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Order ID from URL

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <Link to="/my-orders" style={{ textDecoration: "none", color: "#007bff" }}>
        ← Back to My Orders
      </Link>

      <h2 style={{ marginTop: "1rem" }}>📦 Order Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <div style={{ marginBottom: "1.5rem" }}>
            <h4>🚚 Shipping Info</h4>
            <p>
              <strong>Address:</strong>{" "}
              {order.shippingInfo?.address}, {order.shippingInfo?.city},{" "}
              {order.shippingInfo?.state} - {order.shippingInfo?.pinCode}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4>💳 Payment</h4>
            <p>
              <strong>Status:</strong>{" "}
              {order.paymentInfo?.status === "succeeded" ? (
                <span style={{ color: "green" }}>✅ Paid</span>
              ) : (
                <span style={{ color: "red" }}>❌ Not Paid</span>
              )}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4>🛍️ Items</h4>
            {order.orderItems?.length === 0 ? (
              <p>No items found in this order.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {order.orderItems.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                    />
                    <span>
                      {item.name} - {item.quantity} x ₹{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h4>💰 Total Price: ₹{order.totalPrice?.toFixed(2)}</h4>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
