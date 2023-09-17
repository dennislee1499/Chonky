import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/usersReducer";
import { useHistory } from "react-router-dom"

function LoggingOut() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(logoutUser()).then(() => history.push("/"));
  }

  return (
    <button id="logout-drop-button" onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LoggingOut;
