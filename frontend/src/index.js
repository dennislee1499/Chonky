import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();

const initializeApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} 

initializeApp();


