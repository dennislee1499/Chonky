import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import SplashPage from "./components/SplashPage";


function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <SplashPage /> 
        </Route>
        <Route exact path="/register">
          <SignupForm />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
