import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFoundBox">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="homeLink">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
