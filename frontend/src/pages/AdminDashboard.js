// src/components/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">Manage Orders</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
