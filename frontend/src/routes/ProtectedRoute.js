// frontend/src/routes/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, isAdmin }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (isAdmin && user.role !== "admin") return <Navigate to="/login" />;

  return <Component />;
}
