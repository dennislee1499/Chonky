const SET_ERRORS = "errors/SET_ERRORS";
const RESET_ERRORS = "errors/RESET_ERRORS";

const setErrors = (errors) => ({
  type: SET_ERRORS,
  errors,
});

const resetErrors = () => ({
  type: RESET_ERRORS,
  errors: [],
});

export const storeErrors = (errors) => async (dispatch) => {
  dispatch(setErrors(errors));
};

export const removeErrors = () => async (dispatch) => {
  dispatch(resetErrors());
};

const initialState = JSON.parse(sessionStorage.getItem("errors")) || {};

function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.errors;
    case RESET_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

export default errorsReducer;
