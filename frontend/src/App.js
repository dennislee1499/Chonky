import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import SplashPage from "./components/SplashPage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


function App() {
  let location = useLocation();
  return (
    <>
      <NavBar
        hideSearch={
          location.pathname === "/login" || location.pathname === "/register"
        }
      />
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
      </Switch>
      <Footer />
    </>
  );
}


export default App;
