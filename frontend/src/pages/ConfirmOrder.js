// frontend/src/pages/ConfirmOrder.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  // Dummy data
  const shippingInfo = {
    address: "123 Main Street",
    city: "Delhi",
    state: "Delhi",
    pinCode: "110001",
    phoneNo: "9876543210",
  };

  const cartItems = [
    {
      _id: "1",
      name: "Cotton Saree",
      price: 999,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      _id: "2",
      name: "Denim Jeans",
      price: 799,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const totalPrice = subtotal + shippingCharges;

  const proceedToPayment = () => {
    // Save to Redux or localStorage later
    navigate("/process/payment");
  };

  return (
    <div className="confirmOrderPage">
      <div className="orderSummary">
        <h2>Shipping Info</h2>
        <p><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`}</p>
        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>

        <h2>Cart Items</h2>
        {cartItems.map((item) => (
          <div className="orderItem" key={item._id}>
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
            <span>
              {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
            </span>
          </div>
        ))}

        <div className="priceSummary">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping: ₹{shippingCharges}</p>
          <h3>Total: ₹{totalPrice}</h3>
        </div>

        <button onClick={proceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
