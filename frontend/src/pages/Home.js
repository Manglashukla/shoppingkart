// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/products");
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{ padding: "2rem" }}>Loading products...</p>;

  return (
    <div className="homePage" style={{ padding: "2rem" }}>
      <h2>Featured Products</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1.5rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filteredProducts.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div
          className="productGrid"
          style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="productCard"
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                maxWidth: "200px",
              }}
            >
              <img
                src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
                alt={product.name}
                width="150"
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link to={`/product/${product._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
