import './CheckoutPage.css';
import { Link } from "react-router-dom";
import box from "./box.png"

export default function CheckoutPage() {

    return (
        <div className="checkout-page">
            <h1>High-five! Thanks for your order!</h1>
            <img src={box} className="checkout-image" alt="box" />
            <h3>Order Number: {Math.floor(Math.random() * 900000000 + 100000000)}</h3>
            <Link to="/">Continue Shopping</Link>
        </div>
    )
}