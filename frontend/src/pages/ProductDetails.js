// frontend/src/pages/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert("Item Added To Cart");
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="productDetails">
      {product && (
        <>
          <div className="productImage">
            <img
              src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
              alt={product.name}
            />
          </div>

          <div className="productInfo">
            <h2>{product.name}</h2>
            <p className="productId">Product # {product._id}</p>
            <hr />
            <div className="detailsBlock-3">
              <h1>₹{product.price}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={() => product.stock > quantity && setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                  disabled={product.stock < 1}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <hr />

            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>

            <button className="submitReview">Submit Review</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
