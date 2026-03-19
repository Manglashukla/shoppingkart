// frontend/src/pages/ConfirmOrder.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div className="confirmOrderPage">
      <div className="orderSummary">
        <h2>Shipping Info</h2>
        <p><b>Name:</b> {user && user.name}</p>
        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
        <p><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`}</p>

        <h2>Cart Items</h2>
        <div className="confirmCartItems">
          {cartItems.map((item) => (
            <div className="orderItem" key={item.product}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
              <span>
                {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="priceSummary">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Shipping: ₹{shippingCharges.toFixed(2)}</p>
          <p>GST (18%): ₹{tax.toFixed(2)}</p>
          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
        </div>

        <button onClick={proceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
