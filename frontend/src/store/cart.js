import csrfFetch from "./csrf";

const RECEIVE_CART = "cart/RECEIVE_CART";
const ADD_PRODUCT = "cart/ADD_PRODUCT";
const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";



const addProduct = (cartItem) => {
  return {
    type: ADD_PRODUCT,
    cartItem,
  };
};

const receiveCart = (cart) => {
  return {
    type: RECEIVE_CART,
    cart,
  };
};

export const removeProduct = (cartItemId) => {
  return {
    type: REMOVE_PRODUCT,
    cartItemId,
  };
};

export const fetchCartItems = (userId) => async (dispatch) => {
  if (userId) {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();

    dispatch(receiveCart(data.cart));
  }
};



// export const addCartItem = (cartItem) => async (dispatch) => {
//   const res = await csrfFetch("/api/cart_items", {
//     method: "POST",
//     body: JSON.stringify(cartItem),
//   });
//   const data = await res.json();
//   dispatch(addProduct(data.cart));
// };

export const addCartItem = (cartItem) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/cart_items", {
      method: "POST",
      body: JSON.stringify(cartItem),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(addProduct(data.cart)); 
    } else {
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
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


