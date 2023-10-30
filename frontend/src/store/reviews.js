import { RECEIVE_PRODUCT } from "./products";
import  csrfFetch  from "./csrf";

const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const UPDATE_REVIEW = "reviews/EDIT_REVIEW";
const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  }
}

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
    body: JSON.stringify({ product_id: review.productId, ...review }),
  });

  const data = await res.json();
  const reviewData = data.review[Object.keys(data.review)[0]];
  dispatch(addReview(reviewData));
};

export const editReview = (reviewId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(reviewId, updatedReview));
  }
};

export const fetchReviews = (productId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${productId}`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(receiveReviews(reviews));
  }
};


export default function reviewsReducer(state = {}, action) {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_REVIEWS:
    return {
      ...state, 
      ...action.reviews.reduce((acc, review) => {
        acc[review.id] = review;
        return acc;
      }, {}),
    }
    case ADD_REVIEW:
      const { id } = action.review;
      return {
        ...newState,
        [id]: action.review,
      };
      
    case RECEIVE_PRODUCT:
      return { ...newState, ...action.reviews };

    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;

    case UPDATE_REVIEW: {
      return {
        ...state,
        [action.reviewId]: {
          ...state[action.reviewId],
          ...action.review,
        }
      };
    }

    default:
      return state;
  }
}
