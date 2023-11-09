import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import SplashPage from "./components/SplashPage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ProductShow from "./components/ProductShow";
import SearchPage from "./components/SearchPage";
import CartIndex from "./components/Cart/CartIndex";
import CheckoutPage from "./components/CheckoutPage";
import ReviewForm from "./components/ReviewForm";
import EditReviewForm from "./components/ReviewForm/EditReviewForm";
import NoProductsFound from "./components/NoProductsFound";
import LookingForProducts from "./components/LookingForProducts";

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

          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>

          <Route path="/login">
            <LoginForm />
          </Route>

          <Route exact path="/cart">
            <CartIndex />
          </Route>

          <Route exact path="/search">
            <SearchPage />
          </Route>

          <Route exact path="/review/:productId">
            <ReviewForm />
          </Route>

          <Route exact path="/no-products-found">
            <NoProductsFound  />
          </Route>

          <Route exact path="/looking-for-products">
            <LookingForProducts />
          </Route>

          <Route exact path="/products/:productId/reviews/edit/:reviewId">
            <EditReviewForm />
          </Route>

          <Route exact path="/products/:productId">
            <ProductShow />
          </Route>

        </Switch>
      </div>
      <Footer />
    </div>
  );
}




export default App;
