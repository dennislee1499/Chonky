import { csrfFetch } from "./csrf";

// ACTION TYPES
const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

// ACTION CREATORS
export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId, 
});

// REDUCER
const userReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_USER:
      nextState[action.payload.id] = action.payload;
      return nextState;
    case REMOVE_USER:
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};


 // THUNK ACTION CREATORS
    export const loginUser = user => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(receiveUser(data.user))
    };

    export const logoutUser = userId => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'DELETE'
        });
        sessionStorage.setItem('currentUser', null)
        dispatch(removeUser(userId));
    }

    // export const createUser = user => async dispatch => {
    //     let res = await csrfFetch('/api/users', {
    //         method: 'POST',
    //         body: JSON.stringify(user)
    //     });
    //     let data = await res.json();
    //     sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    //     dispatch(receiveUser(data.user));
    // }

    export const createUser = (user) => async (dispatch) => {
      try {
        let res = await csrfFetch("/api/users", {
          method: "POST",
          body: JSON.stringify(user),
        });
        if (res.ok) {
          let data = await res.json();
          sessionStorage.setItem("currentUser", JSON.stringify(data.user));
          dispatch(receiveUser(data.user));
          return data; // Ensuring data is returned when the response is okay
        } else {
          let errorData = await res.json(); // Get error message from response body if available
          throw new Error(
            "Network response was not ok: " +
              (errorData.message || res.statusText)
          );
        }
      } catch (error) {
        console.error("Error during user creation:", error);
        throw error; // This will allow calling code to handle the error as well
      }
    };

export default userReducer;
