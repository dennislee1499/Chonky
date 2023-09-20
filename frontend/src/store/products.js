import csrfFetch from "./csrf";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";

export const receiveProducts = (products) => {
    return {
        type: RECEIVE_PRODUCTS,
        products
    }
}

export const fetchProducts = () => async dispatch => {
    const res = await csrfFetch('/api/products');
    const data = await res.json();
    dispatch(receiveProducts(data.products));
}

function productsReducer (state = {}, action) {
    switch(action.type) {
        case RECEIVE_PRODUCTS:
            return {...state, ...action.products};
        default:
            return state;
    }
}

export default productsReducer;