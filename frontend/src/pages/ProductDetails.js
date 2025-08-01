// src/pages/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import axios from "../axios";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart(product._id, quantity));
      alert("Added to cart!");
    }
  };

  if (!product) return <p style={{ padding: "2rem" }}>Product not found</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.name}</h2>
      <img
      src={product.images?.[0]?.url || "/default-product.jpeg"}
      alt={product.name}
      width="200"
      />



      <p>Price: ₹{product.price}</p>
      <p>Description: {product.description}</p>
      <p>Stock: {product.stock}</p>

      <div>
        <label>Quantity:</label>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button onClick={addToCartHandler} style={{ marginTop: "1rem" }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
