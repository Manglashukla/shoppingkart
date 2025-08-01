import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutBox">
        <h1>About ShoppingKart</h1>
        <p>
          ShoppingKart is a modern e-commerce platform built with MERN stack,
          designed to offer fast, smooth, and secure online shopping experiences.
        </p>

        <p>
          Whether you're looking for electronics, fashion, or daily essentials,
          ShoppingKart connects you with high-quality products and trusted vendors.
        </p>

        <h3>🚀 What we offer:</h3>
        <ul>
          <li>✔ Seamless product browsing</li>
          <li>✔ Easy user registration & login</li>
          <li>✔ Secure payments via Stripe</li>
          <li>✔ Order tracking & management</li>
          <li>✔ Admin product control</li>
        </ul>

        <p style={{ marginTop: "2rem" }}>
          Built with ❤️ by a passionate developer using React, Node.js, MongoDB,
          and Express.
        </p>
      </div>
    </div>
  );
};

export default About;
