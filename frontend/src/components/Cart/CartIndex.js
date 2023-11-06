import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartIndexItem from "./CartIndexItem";
import "./Cart.css";
import { checkout, fetchCartItems, resetCart } from "../../store/cart";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../store/products";

export default function CartIndex() {
  let currentUser = useSelector((state) => state.session.user); 
  const cart = useSelector((state) => Object.values(state.cart));
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      dispatch(fetchCartItems());
    });
  }, [dispatch]);


  let quant = 0;
  let price = 0;
  if (currentUser && cart.length) {
    cart.forEach((item) => {
      quant += parseFloat(item?.quantity);
      price += parseFloat(item?.price * item?.quantity);
    });
  }


  function handleCheckout() {
    dispatch(checkout(currentUser.id));
    history.push("/checkout");
    dispatch(resetCart());
  }

  if (cart && cart.length) {
    return (
      <div className="cart-page">
        <div className="cart-index">
          <h1>Shopping Cart</h1>
          <ul className="cart-items-list">
            {cart.map((item, idx) => (
              <CartIndexItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
        <div className="checkout-container">
          <div className="checkout-headers">
            <h1>Subtotal</h1>
            <h1>${price?.toFixed(2)}</h1>
            <h3>{quant} items</h3>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="empty-cart-page">
        <h1>Your cart is empty.</h1>
        <img src="/images/empty-box.avif" alt="box" />
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }
}
