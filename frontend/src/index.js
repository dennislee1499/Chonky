import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { initializeApp } from "./store/session";
import { initializeWindowMethods } from "./store/windowMethods";

initializeWindowMethods();

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

initializeApp().then(renderApp);
