import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser, clearErrors } from "../actions/userActions";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Profile updated successfully!");
      dispatch(loadUser());
      navigate("/profile");
      dispatch({ type: "UPDATE_PROFILE_RESET" });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
  };

  return (
    <div className="updateProfileContainer">
      <form className="updateProfileForm" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <input
          type="text"
          placeholder="Name"
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
