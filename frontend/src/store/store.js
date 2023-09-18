// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import usersReducer from "./usersReducer";

// const rootReducer = combineReducers({
//   user: usersReducer,
// });

// let enhancer;

// if (process.env.NODE_ENV === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require("redux-logger").default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const store = createStore(rootReducer, undefined, enhancer);
// // console.log(store);
// export default store;


import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import usersReducer from "./usersReducer";
import redirectMiddleware from "../redirectMiddleware";

const rootReducer = combineReducers({
  user: usersReducer,
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

const store = createStore(rootReducer, undefined, enhancer);

export default store;






