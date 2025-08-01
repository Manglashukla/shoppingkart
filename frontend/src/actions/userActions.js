import axios from "../axios";

// Load user (auto-login)
// frontend/src/actions/userActions.js

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOAD_REQUEST" });

    const { data } = await axios.get("/api/v1/users/me");

    dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: data.user, // ✅ must include isAdmin
    });
  } catch (error) {
    dispatch({
      type: "USER_LOAD_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};


// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/users/login",
      { email, password },
      config
    );

    dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/users/register", userData, config);

    dispatch({ type: "REGISTER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/users/logout");
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// ✅ Get all users (admin only)
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ALL_USERS_REQUEST" });

    const {
      userLogin: { user },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    const { data } = await axios.get("/users", config);

    dispatch({ type: "ALL_USERS_SUCCESS", payload: data.users });
  } catch (error) {
    dispatch({
      type: "ALL_USERS_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};
