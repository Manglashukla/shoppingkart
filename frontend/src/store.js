import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { myOrdersReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  cart: cartReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  // other reducers...
});

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

const initialState = {
  cart: {
    cartItems: cartFromStorage,
    shippingInfo: shippingFromStorage,
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  // ❌ DON'T manually add thunk here
  devTools: true,
});

export default store;
