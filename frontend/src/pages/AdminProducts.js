import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h3>📦 All Products</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ₹{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;
