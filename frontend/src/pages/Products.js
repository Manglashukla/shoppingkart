import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(2000);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data.products);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter(
    (product) =>
      product.price <= price &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="productsPage">
      <div className="filterSidebar">
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>Max Price: ₹{price}</label>
        <input
          type="range"
          min="0"
          max="5000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="productGrid">
        {loading ? (
          <p>Loading products...</p>
        ) : filtered.length > 0 ? (
          filtered.map((product) => (
            <div key={product._id} className="productCard">
              <img
                src={product.images?.[0]?.url || "/default-product.jpeg"}
                alt={product.name}
                width="150"
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link to={`/product/${product._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
