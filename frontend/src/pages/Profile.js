// frontend/src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/me", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch profile");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/users/logout", {
        withCredentials: true,
      });
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed");
    }
  };

  if (!user) return <p style={{ padding: "2rem" }}>Loading profile...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Profile</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
        <img
          src={user.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="User Avatar"
          width="120"
          height="120"
          style={{ borderRadius: "50%", border: "2px solid #ccc" }}
        />
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Link to="/profile/update">
          <button>Edit Profile</button>
        </Link>

        <Link to="/profile/password">
          <button>Change Password</button>
        </Link>

        <Link to="/myorders">
          <button>My Orders</button>
        </Link>

        <Link to="/feedback">
          <button>Feedback</button>
        </Link>

        <Link to="/review">
          <button>Review</button>
        </Link>

        <Link to="/contact">
          <button>Contact Us</button>
        </Link>

        <Link to="/about">
          <button>About</button>
        </Link>

        {/* ✅ Logout Button */}
        <button onClick={handleLogout} style={{ backgroundColor: "#f44336", color: "white" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
