import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/products";
import { fetchCartItems } from "../../store/cart";

export default function Cart() {
  let currentUser = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart);
  const cart = Object.values(cartItems);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartItems(currentUser?.id));
  }, [dispatch, currentUser?.id]);


  let quant = 0;
  let price = 0;
    if (currentUser && cart.length) {
      cart.forEach((item) => {
        quant += parseFloat(item?.quantity);
        price += parseFloat(item?.price * item?.quantity);
      });
    }


  if (currentUser && cart.length) {
        return (
            <div className="cart"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                <div className="icon-and-badge">
                    <i className="fa fa-shopping-cart fa-xl" style={{color: "#ffffff"}}></i>
                    <span className="cart-badge">{quant}</span>
                </div>
                <Link to="/cart"><h1>cart</h1></Link>

                {show && 
                    <div className="cart-drop">
                        <div className="cart-drop-headers">
                            <h2>Cart Subtotal: ${price?.toFixed(2)}</h2>
                            <Link to="/cart">Proceed to Checkout</Link>
                       </div>
                        <ul>
                            {cart.map( item => <CartItem item={item}/>)}
                        </ul>  
                    </div>
                }     
            </div>
        )
        } else {
            return (
                <div className="cart"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                    <i className="fa fa-shopping-cart fa-lg" style={{color: "#ffffff"}}></i>
                    <span className="cart-badge">{quant}</span>
                    <Link to="/cart"><h1>cart</h1></Link>

                    {show &&
                        <ul className="your-cart-empty">
                            Your cart is empty.
                        </ul>
                    }
                </div>
        )
      }
   }
