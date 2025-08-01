// frontend/src/actions/productActions.js
import axios from "../axios";

export const getAllProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ALL_PRODUCTS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get("/products/admin", config);

    dispatch({ type: "ALL_PRODUCTS_SUCCESS", payload: data.products });
  } catch (error) {
    dispatch({
      type: "ALL_PRODUCTS_FAIL",
      payload: error.response?.data.message || error.message,
    });
  }
};
