import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../actions/userActions";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Password updated successfully!");
      navigate("/profile");
      dispatch({ type: "UPDATE_PASSWORD_RESET" });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
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

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
