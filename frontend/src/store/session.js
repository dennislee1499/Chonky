import csrfFetch  from "./csrf.js";
import { fetchCartItems, resetCart } from "./cart.js";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";



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
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.user) {
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(fetchCartItems()); 
  }
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
  if (data.user) {
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    dispatch(fetchCartItems());
  }
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




export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  if (response.ok) {
      storeCurrentUser(null);
      dispatch(removeCurrentUser());
      dispatch(resetCart());
      return response;
  }
};





const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};


const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
