// frontend/src/pages/Products.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, clearErrors } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const keyword = ""; // Can be connected to a search bar in Header if needed

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="productsPage">
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <p>Price</p>
            <input
              type="range"
              min={0}
              max={25000}
              value={price[1]}
              onChange={(e) => setPrice([0, Number(e.target.value)])}
            />
            <span>Max: ₹{price[1]}</span>

            <p>Categories</p>
            <ul className="categoryBox">
              {categories.map((cat) => (
                <li
                  className="category-link"
                  key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <fieldset>
              <legend>Ratings Above</legend>
              <input
                type="range"
                min={0}
                max={5}
                value={ratings}
                onChange={(e) => setRatings(Number(e.target.value))}
              />
              <span>{ratings} Stars</span>
            </fieldset>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
