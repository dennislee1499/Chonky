import csrfFetch from "./csrf";
import { fetchProducts } from "./products";

export const GET_RESULTS = 'search/getResults'
export const CLEAR_RESULTS = "search/clearResults";



export const receiveSearchResults = (products) => ({
  type: GET_RESULTS,
  products,
});

export const clearSearchResults = () => ({
  type: CLEAR_RESULTS,
});



export const fetchSearchResults = (query) => async (dispatch) => {
  const res = await csrfFetch(`/api/products/search?query=${query}`);
  const data = await res.json();

  if (res.ok && data.products && Object.keys(data.products).length > 0) {
    const productsArray = Object.values(data.products);
    dispatch(receiveSearchResults(productsArray));
  } else {
    dispatch(receiveSearchResults([]));
  }

  return data;
};



const initialState = {
  products: [],
  dropdownVisible: false,
};


export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESULTS:
      return { ...state, products: action.products };
    case CLEAR_RESULTS:
      return { ...state, products: [] };
    default:
      return state;
  }
}
