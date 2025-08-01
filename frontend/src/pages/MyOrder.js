import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Order ID</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Items</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Total</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Payment</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ padding: "0.5rem", verticalAlign: "top" }}>{order._id}</td>
                <td style={{ padding: "0.5rem" }}>
                  {order.orderItems.map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                      <img
                        src={item.image || "/default-product.jepg"}
                        alt={item.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }}
                      />
                      <span>{item.name} × {item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td style={{ padding: "0.5rem", verticalAlign: "top" }}>₹{order.totalPrice}</td>
                <td style={{ padding: "0.5rem", verticalAlign: "top" }}>{order.paymentInfo?.status}</td>
                <td style={{ padding: "0.5rem", verticalAlign: "top" }}>
                  <Link to={`/order/${order._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
