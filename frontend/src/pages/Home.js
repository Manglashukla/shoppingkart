// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, clearErrors } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [dispatch, error]);

  const filteredProducts = products ? products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="home" style={{ padding: "2rem" }}>
      <h2 className="homeHeading">Featured Products</h2>

      {/* 🔍 Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.8rem 1.5rem",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "25px",
            border: "2px solid #007bff",
            outline: "none",
            fontSize: "1rem"
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center" }}>No matching products found.</p>
          ) : (
            <div className="container" id="container">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
