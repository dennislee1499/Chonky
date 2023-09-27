import csrfFetch from "./csrf";

export const GET_RESULTS = 'search/getResults'
export const CLEAR_RESULTS = "search/clearResults";



export const receiveSearchResults = (products) => ({
  type: GET_RESULTS,
  products,
});

export const clearSearchResults = () => ({
  type: CLEAR_RESULTS,
});





export const fetchSearchResults = (query) => async dispatch => {
  const res = await csrfFetch(`/api/products/search?query=${query}`);
  const data = await res.json();
  const productsObj = data.products ? data.products : {};
  const productsArray = Object.values(productsObj);
  dispatch(receiveSearchResults(productsArray));
  return data;
};


const initialState = {
  products: [],
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
