import { RECEIVE_PRODUCT } from "./products";
import  csrfFetch  from "./csrf";

const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const UPDATE_REVIEW = "reviews/EDIT_REVIEW";

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};

export const updateReview = (reviewId, review) => {
  return {
    type: UPDATE_REVIEW,
    reviewId,
    review,
  };
};

export const deleteReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  dispatch(removeReview(reviewId));
};

export const submitReview = (review) => async (dispatch) => {
  const res = await csrfFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(review),
  });

  const data = await res.json();
  dispatch(addReview(data.review));
};

export const editReview = (reviewId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(review),
  });

  dispatch(updateReview(reviewId, review));
};

export default function reviewsReducer(state = {}, action) {
  const newState = { ...state };

  switch (action.type) {
    case ADD_REVIEW:
      return { ...newState, ...action.review };
    case RECEIVE_PRODUCT:
      return { ...newState, ...action.reviews };
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    case UPDATE_REVIEW:
      newState[action.reviewId] = action.review;
      return newState;
    default:
      return state;
  }
}
