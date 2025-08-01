import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", width: "200px" }}>
      <img src={product.images?.[0]?.url} alt={product.name} width="100%" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
