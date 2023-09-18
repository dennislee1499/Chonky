import { fetchCsrfToken, csrfFetch } from "./csrf.js";
import { setError } from "./errors.js";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";
const SET_ERROR = "session/setError";
const CLEAR_ERROR = "session/clearError";



const clearError = () => ({
  type: CLEAR_ERROR,
});



const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};



export const redirectAfterSuccess = () => ({
  type: "REDIRECT_AFTER_SUCCESS",
});


export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const res = await csrfFetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        dispatch(redirectAfterSuccess());  
        return { ok: res.ok, errors: data.errors };
      } else {
        // Handle error response here
        dispatch(setError(data.errors || "Unknown error"));
        return { ok: res.ok, errors: data.errors };
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      dispatch(setError(error.message));
      return { ok: false, errors: [error.message] };
    }
  };




export const restoreSession = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "GET",
  });
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};



export const signupUser = (user) => async (dispatch) => {
  try {
    const csrfToken = await fetchCsrfToken();
    const { full_name, email, password } = user;

    console.log({ full_name, email, password });

    const res = await csrfFetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
      dispatch(redirectAfterSuccess());  
      return { ok: res.ok, errors: data.errors };
    } else {
      // Handle error response here
      dispatch(setError(data.errors || "Unknown error"));
      return { ok: res.ok, errors: data.errors };
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    dispatch(setError(error.message));
  }
};



export const logoutUser = () => async (dispatch) => {
  try {
    const csrfToken = await fetchCsrfToken();
    const res = await csrfFetch("/api/session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
    if (res.ok) {
      storeCurrentUser(null);
      dispatch(removeCurrentUser());
      dispatch(redirectAfterSuccess()); // Redirect after logout
    } else {
      const errorData = await res.json();
      console.error("Logout error:", errorData);
    }
    return res;
  } catch (error) {
    console.error("Logout error:", error.message);
    dispatch(setError(error.message));
  }
};




const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser") || "null"),
  error: null, // Add an error field to the initial state
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default usersReducer;
