import csrfFetch from "./csrf";
import { REMOVE_REVIEW } from "./reviews";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
export const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT";

const initialState = {
  products: {}
};

export const receiveProducts = (products) => {
    return {
        type: RECEIVE_PRODUCTS,
        products
    }
}

export const receiveProduct = (product) => {
    return {
        type: RECEIVE_PRODUCT,
        product
    }
}


export const fetchProducts = () => async (dispatch) => {
  const res = await csrfFetch("/api/products");
  const data = await res.json();
  dispatch(receiveProducts(data.products));

  return Promise.resolve(data.products);
};


export const fetchProduct = (productId) => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}`);
    const data = await res.json();
    dispatch(receiveProduct(data.product[productId]))
}


function productsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return { ...state, ...action.products };

    case RECEIVE_PRODUCT:
      const productId = action.product.id;
      return {
        ...state,
        [productId]: action.product,
      };

    case REMOVE_REVIEW:
      const updatedState = { ...state };
      for (let id in updatedState) {
        const product = updatedState[id];
        if (
          product.reviews &&
          product.reviews.find((review) => review.id === action.reviewId)
        ) {
          product.reviews = product.reviews.filter(
            (review) => review.id !== action.reviewId
          );
        }
      }
      return updatedState;

    default:
      return state;
  }
}


export default productsReducer;
