// frontend/src/pages/Dashboard.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return user && user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
