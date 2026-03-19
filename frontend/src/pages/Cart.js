// frontend/src/pages/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="cartPage">
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <h2>No Product in Your Cart</h2>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <div className="cartInput">
                <img src={item.image} alt="product" />
                <div className="cartItemInfo">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>{`Price: ₹${item.price}`}</span>
                  <p onClick={() => deleteCartItems(item.product)}>Remove</p>
                </div>
              </div>
              <div className="cartInput">
                <button onClick={() => decreaseQuantity(item.product, item.qty)}>-</button>
                <input type="number" value={item.qty} readOnly />
                <button onClick={() => increaseQuantity(item.product, item.qty, item.stock)}>+</button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.qty}`}</p>
            </div>
          ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
