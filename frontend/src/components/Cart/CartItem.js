import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartItem({item}) {
  const products = useSelector((state) => state.products);
  const product = products[item.item.productId];

  return (
    <li className="cart-drop-item">
      <img src={`${product?.imageUrl}`} />
      <Link to={`/products/${product?.id}`}>
        <p>{product?.name}</p>
      </Link>
      <p>${parseFloat(item?.item.price).toFixed(2)}</p>
      <p>(Qty: {item.item.quantity})</p>
    </li>
  );
}
