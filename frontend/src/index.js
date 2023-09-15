import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { restoreSession } from "./store/csrf";
import { createUser, loginUser, logoutUser } from "./store/userReducer";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from './store/usersReducer';



window.createUser = createUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let initialState = {};


    if (currentUser) {
        initialState = {
            user: {
            [currentUser.id]: currentUser
            }
        };
    };

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));



const initializeApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

restoreSession().then(initializeApp);

