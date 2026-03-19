// frontend/src/components/AdminDashboard.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../actions/productActions";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Link to="/admin/products">📦 Products</Link>
        <Link to="/admin/orders">🛒 Orders</Link>
        <Link to="/admin/users">👥 Users</Link>
        <Link to="/admin/reviews">💬 Reviews</Link>
      </div>

      <div className="dashboardContainer">
        <h1>Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/products">
              <p>Out of Stock</p>
              <p>{outOfStock}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>5</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
