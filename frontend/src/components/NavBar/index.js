import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoggingOut from "../SplashPage/LoggingOut";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import { logoutUser } from "../../store/usersReducer";
import "../../logo.css"
import Logo from "../../logo";



function UserDropDown({ greeting }) {
  const currentUser = useSelector((state) => state.session?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <div className="user-dropdown">
      <div className="greeting-container">{greeting}</div>
      {currentUser && (
        <div className="logout-container">
          <LoggingOut />
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
        <Logo />
      </Link>
      <SearchBox />
      <DropDown />
    </header>
  );
}


export default NavBar;




// function NavBar() {
//   const currentUser = useSelector((state) => state.session?.user);

//   const dispatch = useDispatch();

//     const handleLogout = () => {
//       dispatch(logoutUser());
//     };


//   return (
//     <header className="nav-bar">
//       <Link to="/"></Link>
//       <SearchBox />
//       {currentUser ? (
//         <div className="user-greetings">
//           {/* User's greeting and logout button here */}
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div className="auth-links">
//           <Link id="login" to="/login">
//             Sign In
//           </Link>
//           <Link id="register" to="/register">
//             Create an Account
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }