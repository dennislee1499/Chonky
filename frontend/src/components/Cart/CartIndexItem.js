import { useDispatch, useSelector } from "react-redux";
import {deleteCartItem, removeProduct, updateCartItem} from "../../store/cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProduct } from "../../store/products";

export default function CartIndexItem({item}) {
  const products = useSelector((state) => state.products);
  const product = products[item.productId];
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);


  useEffect(() => {
    console.log("item:",item);
    if (!product) {
      dispatch(fetchProduct(item.productId)); 
    }
  }, [item, product, dispatch]); 

  
  function handleRemove(cartItemId) {
    dispatch(deleteCartItem(cartItemId));
    dispatch(removeProduct(cartItemId));
  }

  function handleChange(e) {
    const updatedQuantity = parseInt(e.target.value, 10);
    setQuantity(updatedQuantity);
    dispatch(updateCartItem(item?.id, updatedQuantity));
  }


  return (
    <ul id="cart-index-item">
      <img src={`${product?.imageUrl}`} />
      <div id="cart-info">
        <Link id="link-to-show-from-product" to={`/products/${product?.id}`}>
          <li>{product?.name}</li>
        </Link>
        <li id="cart-index-price">${parseFloat(item?.price).toFixed(2)}</li>
        {item?.flavor && <li>Flavor: {item?.flavor}</li>}
        {item?.size && <li>Size: {item?.size}</li>}
        {item?.color && <li>Color: {item?.color}</li>}
      </div>
      <div id="cart-index-buttons">
        <label>
          Quantity:
          <select
            className="quantity-dropdown-cartindex"
            onChange={handleChange}
            defaultValue={quantity}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
          </select>
        </label>
        <button onClick={() => handleRemove(item.id)}>Remove</button>
      </div>
    </ul>
  );
}
