import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import logoImage from "./logoImage.png";
import Cart from "../Cart";



function DropDown() {
  const [show, setShow] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const dropdownTitle = currentUser ? `Hello, ${currentUser.fullName}!` : "Sign in";

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
    <>
      <div
        className="DropDown"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <i className="fa fa-user" style={{ color: "#ffffff" }}></i>
        {dropdownTitle}
        {show && !currentUser && (
          <div className="splash-nav-links">
            <Link id="login" to="/login">
              Sign In
            </Link>
            <Link id="create" to="/register">
              Create an Account
            </Link>
          </div>
        )}
        {show && currentUser && (
          <div className="splash-nav-links">
            <Link id="logout" to="/logout" onClick={handleLogout}>
              Sign Out
            </Link>
          </div>
        )}
      </div>
      <div className="cart">
        <Cart />
      </div>
    </>
  );
}


function NavBar() {
  return (
    <header className="nav-bar">
      <Link to="/">
        <img src={logoImage} alt="Your Logo" className="new-logo" />
      </Link>
      <SearchBox />
      <DropDown />
    </header>
  );
}


export default NavBar;
