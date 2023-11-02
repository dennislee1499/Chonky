import csrfFetch from "./csrf";

const RECEIVE_CART = "cart/RECEIVE_CART";
const ADD_PRODUCT = "cart/ADD_PRODUCT";
const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";
const UPDATE_PRODUCT = "cart/UPDATE_PRODUCT";
const RESET_CART = "cart/RESET_CART";



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

const updateProduct = (cartItemId, quantity) => {
  if (quantity < 1) return removeProduct(cartItemId);

  return {
    type: UPDATE_PRODUCT,
    cartItemId,
    quantity
  }
}

export const resetCart = () => {
  return {
    type: RESET_CART,
    cart: {}
  };
};


export const fetchCartItems = (userId) => async (dispatch) => {
  if (userId) {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();

    dispatch(receiveCart(data.cart));
  }
};



export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (res.ok) {
    const updatedItem = await res.json();
    dispatch(updateProduct(cartItemId, quantity)); 
  }
};


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
};

export const checkout = (userId) => async dispatch => {
  await csrfFetch('/api/cart_items/clear', {
    method: "DELETE"
  })
}


function cartReducer(state = {}, action) {
  const newState = { ...state }

     switch (action.type) {
       case RECEIVE_CART:
         sessionStorage.setItem("cart", JSON.stringify(action.cart));
         return { ...newState, ...action.cart };
       case ADD_PRODUCT:
         sessionStorage.setItem("cart", JSON.stringify(action.cartItem));
         newState[action.cartItem.id] = action.cartItem;
         return newState;
       case RESET_CART:
         return action.cart;
       case REMOVE_PRODUCT:
         delete newState[action.cartItemId];
         return newState;
       case UPDATE_PRODUCT:
         newState[action.cartItemId].quantity = action.quantity;
         return newState;
       default:
         return state;
     }
}

export default cartReducer;


