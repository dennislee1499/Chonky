import { createUser, loginUser, logoutUser } from "./usersReducer";
import store from "./configureStore";

export const initializeWindowMethods = () => {
  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.storeDispatch = store.dispatch;
};
