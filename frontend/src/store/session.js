import csrfFetch  from "./csrf.js";
import { setError } from "./errors.js";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";
const SET_ERROR = "session/setError";
const CLEAR_ERROR = "session/clearError";


const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  }
};


export const redirectAfterSuccess = () => ({
  type: "REDIRECT_AFTER_SUCCESS",
});


export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  storeCurrentUser(data.user)
  dispatch(setCurrentUser(data.user));
  return response;
};




export function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};


export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};


export const signup = (user) => async (dispatch) => {
  const { full_name, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      full_name,
      email,
      password,
    }),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};




// export const logoutUser = () => async (dispatch) => {
//   try {
//     const csrfToken = await fetchCsrfToken();
//     const res = await csrfFetch("/api/session", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRF-Token": csrfToken,
//       },
//     });
//     if (res.ok) {
//       storeCurrentUser(null);
//       dispatch(removeCurrentUser());
//       dispatch(redirectAfterSuccess()); 
//     } else {
//       const errorData = await res.json();
//       console.error("Logout error:", errorData);
//     }
//     return res;
//   } catch (error) {
//     console.error("Logout error:", error.message);
//     dispatch(setError(error.message));
//   }
// };



export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  if (response.ok) {
      storeCurrentUser(null);
      dispatch(removeCurrentUser());
      return response;
  }
};





const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

// console.log("Initial State:", initialState); // This will log the initial state when the app loads ////////////


const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    // case SET_ERROR:
    //   return { ...state, error: action.payload };
    // case CLEAR_ERROR:
    //   return { ...state, error: null };
    default:
      return state;
  }
};

export default sessionReducer;
