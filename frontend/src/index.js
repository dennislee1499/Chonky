import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store/store";
import csrfFetch, { restoreCSRF } from "./store/csrf";
import * as sessionActions from "./store/session";


const preloadedState = {};
const store = configureStore(preloadedState);

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
function Root() {
  return (
   <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </Provider>
  )
}

const renderApplication = () => {
  ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
  )
}


if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}




