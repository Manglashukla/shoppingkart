import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images?.[0]?.url || "https://via.placeholder.com/150"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <span>View Details</span>
    </Link>
  );
};

export default ProductCard;
