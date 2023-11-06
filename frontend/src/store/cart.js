import csrfFetch from "./csrf";

const RECEIVE_CART = "cart/RECEIVE_CART";
const ADD_PRODUCT = "cart/ADD_PRODUCT";
const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";
const UPDATE_PRODUCT = "cart/UPDATE_PRODUCT";
const RESET_CART = "cart/RESET_CART";

export const receiveCart = (cart) => ({
  type: RECEIVE_CART,
  cart,
});

export const addProduct = (cartItem) => ({
  type: ADD_PRODUCT,
  cartItem,
});

export const removeProduct = (cartItemId) => ({
  type: REMOVE_PRODUCT,
  cartItemId,
});

const updateProduct = (cartItemId, quantity) => ({
  type: UPDATE_PRODUCT,
  cartItemId,
  quantity,
});

export const resetCart = () => ({
  type: RESET_CART,
});


export const fetchCartItems = () => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items`);
  if (res.ok) {
    const data = await res.json();

    const flattenedCart = {};
    data.cartItems.forEach((item) => {
      const [key, value] = Object.entries(item)[0];
      flattenedCart[key] = value;
    });

    dispatch(receiveCart(flattenedCart));
  }
};


export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  if (res.ok) {
    dispatch(updateProduct(cartItemId, quantity));
  }
};

export const addCartItem = (cartItem) => async (dispatch) => {
  const res = await csrfFetch("/api/cart_items", {
    method: "POST",
    body: JSON.stringify(cartItem),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addProduct(data.cart));
  }
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeProduct(cartItemId));
  }
};

export const checkout = (userId) => async (dispatch) => {
  await csrfFetch("/api/cart_items/clear", {
    method: "DELETE",
  });
};


function cartReducer(state = {}, action) {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_CART:
      return { ...newState, ...action.cart };

    case ADD_PRODUCT:
      return {
        ...newState,
        [action.cartItem.id]: action.cartItem,
      };

    case RESET_CART:
      return {};

    case REMOVE_PRODUCT:
      delete newState[action.cartItemId];
      return newState;

    case UPDATE_PRODUCT:
      if (newState[action.cartItemId]) {
        newState[action.cartItemId].quantity = action.quantity;
      }
      return newState;

    default:
      return state;
  }
}

export default cartReducer;
