// frontend/src/actions/productActions.js
import axios from "../axios";

// Get All Products
export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_PRODUCTS_REQUEST" });
    let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link);
    dispatch({ type: "ALL_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ALL_PRODUCTS_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCTS_REQUEST" });
    const { data } = await axios.get("/products");
    dispatch({ type: "ADMIN_PRODUCTS_SUCCESS", payload: data.products });
  } catch (error) {
    dispatch({
      type: "ADMIN_PRODUCTS_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PRODUCT_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/products/admin/product/new`, productData, config);
    dispatch({ type: "NEW_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "NEW_PRODUCT_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/products/admin/product/${id}`, productData, config);
    dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });
    const { data } = await axios.delete(`/products/admin/product/${id}`);
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axios.get(`/products/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data.product });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
