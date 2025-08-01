// src/pages/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "center",
              }}
            >
              <img src={item.image} alt={item.name} width="80" height="80" />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => dispatch(removeFromCart(item.product))}
                  style={{ marginLeft: "1rem" }}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          <h3>
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): ₹
            {subtotal.toFixed(2)}
          </h3>

          <button
            onClick={checkoutHandler}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
