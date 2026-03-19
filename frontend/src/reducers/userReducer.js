export const userReducer = (
  state = { user: {}, isAuthenticated: false, loading: true },
  action
) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT_SUCCESS":
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
      };

    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOAD_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOGOUT_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "UPDATE_PROFILE_REQUEST":
    case "UPDATE_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_PROFILE_SUCCESS":
    case "UPDATE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "UPDATE_PROFILE_FAIL":
    case "UPDATE_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_PROFILE_RESET":
    case "UPDATE_PASSWORD_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case "ALL_USERS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
