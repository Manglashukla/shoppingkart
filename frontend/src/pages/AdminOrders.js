import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h3>🧾 All Orders</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - ₹{order.totalPrice} - {order.orderStatus}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
