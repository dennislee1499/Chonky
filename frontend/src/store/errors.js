const SET_ERRORS = "errors/SET_ERRORS";
const RESET_ERRORS = "errors/RESET_ERRORS";

export const setError = (error) => ({
  type: SET_ERRORS,
  errors: error,
});

export const removeErrors = () => ({
  type: RESET_ERRORS,
  errors: [],
});

export const storeErrors = (errors) => async (dispatch) => {
  dispatch(setError(errors));
};

const initialState = JSON.parse(sessionStorage.getItem("errors")) || {
  errors: [],
};

function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      const newState = {
        ...state,
        errors: action.errors,
      };
      sessionStorage.setItem("errors", JSON.stringify(newState));
      return newState;
    case RESET_ERRORS:
      sessionStorage.removeItem("errors");
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
}

export default errorsReducer;

