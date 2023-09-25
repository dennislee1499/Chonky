
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import redirectMiddleware from "../redirectMiddleware";
import searchReducer from "./search";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  search: searchReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk, redirectMiddleware);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(
    applyMiddleware(thunk, logger, redirectMiddleware)
  );
}
const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;






