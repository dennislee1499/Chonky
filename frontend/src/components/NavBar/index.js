import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import "../../logo.css"
import Logo from "../../logo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import logoImage from "./logoImage.png";



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
    <div className="user-dropdown">
      <div className="greeting-container">{greeting}</div>
      {currentUser && (
        <div className="logout-container">
          {/* <LoggingOut /> */}
          <button onClick={handleLogout}>Logout</button>
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
  // const greeting = currentUser?.user
   const greeting = currentUser
    ? `Hey, ${currentUser.fullName}!` 
    : "Sign in";   /////////////



  return (
    <div
      className="DropDown"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {greeting}
      <i className="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
      {/* {isVisible && <UserDropDown greeting={greeting} />} */}
      {isVisible && (
        <UserDropDown greeting={greeting} currentUser={currentUser} />
      )}
    </div>
  );
}


function NavBar({ hideSearch }) {
  return (
    <header className="nav-bar">
      <Link to="/">
        <img src={logoImage} alt="Your Logo" className="new-logo" />
      </Link>
      {!hideSearch && <SearchBox />}
      <DropDown />
    </header>
  );
}


export default NavBar;
