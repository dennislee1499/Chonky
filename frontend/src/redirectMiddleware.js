import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import usersReducer from "./store/usersReducer";

const history = createBrowserHistory();

const redirectMiddleware = (store) => (next) => (action) => {
  if (action.type === "REDIRECT_AFTER_SUCCESS") {
    history.push("/");
  }
  return next(action);
};

export default redirectMiddleware;
