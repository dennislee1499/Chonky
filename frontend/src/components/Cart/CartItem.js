import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function CartItem({item}) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = products[item.productId];
  const productPath = `/products/${product?.id}`;


  return (
    <li className="cart-drop-item">
      <Link to={productPath} className="cart-item-link">
        <img src={`${product?.imageUrl}`} alt="Product" />
        <div className="cart-item-info">
          <p className="cart-item-name">{product?.name}</p>{" "}
          <div className="cart-item-details">
            <p className="item-flavor">Flavor: {item.flavor}</p>
            <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
            <p className="item-quantity">(Qty: {item.quantity})</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
