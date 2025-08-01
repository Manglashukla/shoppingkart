// src/pages/Shipping.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, state, pinCode, phoneNo }));

    // ✅ Navigate to /payment
    navigate("/payment");
  };

  return (
    <div className="shippingContainer" style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit} className="shippingForm">
        <div>
          <label>Address</label>
          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>City</label>
          <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label>State</label>
          <input type="text" required value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div>
          <label>Pin Code</label>
          <input type="text" required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
        </div>
        <div>
          <label>Phone No</label>
          <input type="text" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Shipping;
