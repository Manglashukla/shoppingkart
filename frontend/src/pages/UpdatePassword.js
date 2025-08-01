import React, { useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    console.log("Password Updated:", { oldPassword, newPassword });
    alert("Password updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="updatePasswordContainer">
      <form className="updatePasswordForm" onSubmit={handleSubmit}>
        <h2>Update Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
