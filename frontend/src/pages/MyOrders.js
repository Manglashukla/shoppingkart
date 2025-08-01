import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API call
    const mockOrders = [
      {
        id: "ORD123456",
        date: "2024-07-30",
        status: "Delivered",
        amount: 2498,
      },
      {
        id: "ORD789012",
        date: "2024-07-28",
        status: "Processing",
        amount: 1499,
      },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <div className="ordersContainer">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount (₹)</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>
                  <Link to={`/order/${order.id}`}>View</Link>
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
