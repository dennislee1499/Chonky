import csrfFetch from "./csrf";

const ADD_PRODUCT = "cart/ADD_PRODUCT";
const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";



const addProduct = (cartItem) => {
  return {
    type: ADD_PRODUCT,
    cartItem,
  };
};

export const removeProduct = (cartItemId) => {
  return {
    type: REMOVE_PRODUCT,
    cartItemId,
  };
};



export const addCartItem = (cartItem) => async (dispatch) => {
  const res = await csrfFetch("/api/cart_items", {
    method: "POST",
    body: JSON.stringify(cartItem),
  });
  const data = await res.json();
  dispatch(addProduct(data.cart));
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  await csrfFetch(`/api/cart_items/${cartItemId}`, {
    method: "DELETE",
  });
  dispatch(removeProduct(cartItemId));
};



// function cartReducer (state = {}, action) {
//     switch (action.type) {
//       case ADD_PRODUCT:
//         sessionStorage.setItem("cart", JSON.stringify(action.cartItem));
//         newState[action.cartItem.id] = action.cartItem;
//         return newState;
//       case REMOVE_PRODUCT:
//         delete newState[action.cartItemId];
//         return newState;
//     }
// }

function cartReducer(state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            sessionStorage.setItem("cart", JSON.stringify({ ...state, [action.cartItem.id]: action.cartItem }));
            return {
                ...state,
                [action.cartItem.id]: action.cartItem
            };
        case REMOVE_PRODUCT: {
            const { [action.cartItemId]: _, ...remainingItems } = state;
            sessionStorage.setItem("cart", JSON.stringify(remainingItems));
            return remainingItems;
        }
        default:
            return state;
    }
}

export default cartReducer;


