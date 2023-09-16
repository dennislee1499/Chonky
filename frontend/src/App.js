import React from "react";
import SignupForm from "./components/SignupForm";

// function App() {
//   return (
//     <>
//       <h1>Hello from App</h1>
//       <SignupForm />
//     </>
//   );
// }

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/register">
          <SignupForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
