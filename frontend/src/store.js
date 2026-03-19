import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { 
  myOrdersReducer, 
  orderDetailsReducer, 
  allOrdersReducer 
} from "./reducers/orderReducer";
import { userReducer, allUsersReducer } from "./reducers/userReducer";
import { 
  productsReducer, 
  productDetailsReducer, 
  newProductReducer, 
  productReducer 
} from "./reducers/productReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  allUsers: allUsersReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
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
