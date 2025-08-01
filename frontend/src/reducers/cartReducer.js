// src/reducers/cartReducer.js
const initialState = {
  cartItems: [],
  shippingInfo: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
