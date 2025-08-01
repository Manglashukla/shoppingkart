import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p>Loading user info...</p>;

  // ✅ Option 1: Based on isAdmin boolean (recommended)
  // return user && user.isAdmin ? <AdminDashboard /> : <UserDashboard />;

  // ✅ Option 2: Based on user.role === 'admin'
  return user && user.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
