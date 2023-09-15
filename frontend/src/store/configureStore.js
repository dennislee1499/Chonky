import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./usersReducer";

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let initialState = {};

if (currentUser) {
  initialState = {
    user: {
      [currentUser.id]: currentUser,
    },
  };
}

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
