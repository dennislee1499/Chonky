import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import logoImage from "./logoImage.png";
import Cart from "../Cart";
import { useLocation } from "react-router-dom"



function UserDropDown({ greeting, currentUser }) {
  const dispatch = useDispatch();
  const history = useHistory();



  const handleLogout = async () => {
    try {
      await dispatch(logout());
      history.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <div
      className={`user-dropdown ${currentUser ? "logged-in" : "logged-out"}`}
    >
      <div className="greeting-container">{greeting}</div>
      {currentUser && (
        <div className="logout-container">
          <button id="logout-drop-button" onClick={handleLogout}>
            Sign Out
          </button>
            <span style={{ marginLeft: "10px" }}>
              Not {currentUser?.fullName}?
            </span>
        </div>
      )}
      {!currentUser && (
        <div className="auth-links">
          <Link id="login" to="/login">
            Sign In
          </Link>
          <Link id="register" to="/register">
            Create an Account
          </Link>
        </div>
      )}
    </div>
  );
}

function DropDown() {
  const [isVisible, setIsVisible] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
   const greeting = currentUser
    ? `Hey, ${currentUser.fullName}!` 
    : "Sign in";   



  return (
    <div
      className="DropDown"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <i className="fa fa-user" style={{ color: "#ffffff", marginRight: "10px" }}></i>
      {greeting}
      {isVisible && (
        <UserDropDown greeting={greeting} currentUser={currentUser} />
      )}
    </div>
  );
}


function NavBar({ hideSearch }) {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const location = useLocation();
  const onAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="nav-bar">
      <Link to="/">
        <img src={logoImage} alt="Your Logo" className="new-logo" />
      </Link>
      {!onAuthPage && (
        <>
          {!hideSearch && <SearchBox />}

          <div className="user-cart-container">
            <DropDown />
            <div
              className="cart-container"
              onMouseEnter={() => setIsCartVisible(true)}
              onMouseLeave={() => setIsCartVisible(false)}
            >
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
              </Link>
              <Cart isCartVisible={isCartVisible} />
            </div>
          </div>
        </>
      )}
    </header>
  );
}



export default NavBar;


