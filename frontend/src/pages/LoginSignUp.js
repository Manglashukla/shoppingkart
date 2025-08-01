import React, { useState } from "react";
import "./LoginSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register states
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const loginHandler = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      "/api/v1/auth/login",
      { email, password },
      { withCredentials: true }
    );
    alert("Login successful");
    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

const registerHandler = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      "/api/v1/auth/register",
      { name, email: registerEmail, password: registerPassword },
      { withCredentials: true }
    );
    alert("Registration successful");
    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="loginSignUpContainer">
      <div className="switchTabs">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <form className="formBox" onSubmit={loginHandler}>
          <h2>Login</h2>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      ) : (
        <form className="formBox" onSubmit={registerHandler}>
          <h2>Register</h2>
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default LoginSignUp;
