import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/register">
          <SignupForm />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
