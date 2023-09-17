import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoggingOut from "../SplashPage/LoggingOut";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";

function UserDropDown({ greeting }) {
  const currentUser = useSelector((state) => state.session?.user);

  return (
    <div className="user-dropdown"> {/* Start of user-dropdown div */}
      <div className="greeting-container">
        {greeting} 
      </div>
      {currentUser && (
        <div className="logout-container">
          <LoggingOut />
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




// function UserDropDown({ greeting }) {
//   const currentUser = useSelector((state) => state.session?.user);

//   return (
//     <>
//     <div className="user-dropdown"></div>
//       <div className="greeting-container">
//         {greeting} 
//       </div>
//       {currentUser && (
//         <div className="logout-container">
//           <LoggingOut />
//         </div>
//       )}
//       {!currentUser && (
//         <div className="auth-links">
//           <Link id="login" to="/login">
//             Sign In
//           </Link>
//           <Link id="register" to="/register">
//             Create an Account
//           </Link>
//         </div>
//       )}
//     </>
//      </div>
//   );
// }

function DropDown() {
  const [isVisible, setIsVisible] = useState(false);
  const currentUser = useSelector((state) => state.session?.user);
  const greeting = currentUser ? `Hey, ${currentUser.name}!` : "Sign in";

  return (
    <div
      className="DropDown"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {greeting}
      <i className="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
      {isVisible && <UserDropDown greeting={greeting} />}
    </div>
  );
}

function NavBar() {
  return (
    <header className="nav-bar">
      <Link to="/">
        {/* <img className="logo" src="/..public/images/chompy-logo.png" alt="Logo" /> */}
      </Link>
      <SearchBox />
      <DropDown />
      {/* <div className="cart-container">
        <Cart />
      </div> */}
    </header>
  );
}

export default NavBar;
