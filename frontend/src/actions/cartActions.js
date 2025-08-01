// src/actions/cartActions.js
import axios from "../axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`);

  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images?.[0]?.url || "/default-product.jpeg",
      price: data.product.price,
      stock: data.product.stock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
