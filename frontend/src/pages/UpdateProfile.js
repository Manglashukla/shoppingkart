import React, { useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  // Simulated pre-filled data
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", name, email);
    alert("Profile updated!");
    navigate("/profile");
  };

  return (
    <div className="updateProfileContainer">
      <form className="updateProfileForm" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <input
          type="text"
          placeholder="New Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="New Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
