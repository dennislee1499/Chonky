import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import SplashPage from "./components/SplashPage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ProductsIndex from "./components/ProductsIndex";


function App() {
  let location = useLocation();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBar
        hideSearch={
          location.pathname === "/login" || location.pathname === "/register"
        }
      />
      <div style={{ flex: 1 }}>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/register">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/products">
            <ProductsIndex />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}




export default App;
