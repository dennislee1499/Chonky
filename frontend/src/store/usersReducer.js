import csrfFetch from "./csrf.js";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";

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


async function fetchCsrfToken() {
  try {
    const response = await fetch("http://localhost:5000/api/csrf", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.csrf_token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
}


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
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
      return res;
    } catch (error) {
      console.error("Error logging in user:", error.message);
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
    const { email, password } = user;
    const res = await csrfFetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
  } catch (error) {
    console.error("Error signing up user:", error);
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
    } else {
      const errorData = await res.json();
      console.error("Logout error:", errorData);
    }
    return res;
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};



const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default usersReducer;
