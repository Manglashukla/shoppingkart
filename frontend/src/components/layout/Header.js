// frontend/src/components/layout/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    alert("Logout Successfully");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">🛒 ShoppingKart</Link>
      </div>
      <nav className="header__nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart 🛒</Link>
        
        {isAuthenticated ? (
          <>
            {user && user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/profile">Profile</Link>
            <button onClick={logoutHandler} className="logoutBtn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="loginLink">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
