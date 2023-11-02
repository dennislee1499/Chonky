import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProduct } from "../../store/products";
import "./ProductShow.css";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import "../StarRating/StarRating.css";
import "../Footer/Footer.css";
import { addCartItem } from "../../store/cart";
import { Link } from "react-router-dom";
import { deleteReview, fetchReviews } from "../../store/reviews";
import moment from "moment-timezone";
import { FaStar } from "react-icons/fa";
import { setError } from "../../store/errors";

function ProductShow() {
  const dispatch = useDispatch();
  const productId = parseInt(useParams().productId, 10); 
  const product = useSelector((state) => state.products?.[productId]);
  const reviews = useSelector((state) => state.reviews);
  
  const currentUser = useSelector((state) => state.session.user);
  const [flavor, setFlavor] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(productId))
    }
    dispatch(fetchReviews(productId));
  }, [dispatch, productId, product]);

  const selectedPrices = {
    "3-lb bag": 10.18,
    "3.15-lb bag": 5.29,
    "3.3-lb bag": 10.69,
    "3.5-lb bag": 7.99,
    "5-lb bag": 12.99,
    "6-lb bag": 19.88,
    "6.3-lb bag": 9.19,
    "6.5-lb bag": 18.98,
    "7-lb bag": 17.99,
    "12-lb bag": 32.58,
    "14-lb bag": 26.52,
    "14.2-lb bag": 16.98,
    "15-lb bag": 14.98,
    "16-lb bag": 17.98,
    "17-lb bag": 49.58,
    "18-lb bag": 16.98,
    "22-lb bag": 27.49,
    "24-lb bag": 25.66,
    "30-lb bag": 29.98,
    "33-lb bag": 69.48,
    "Small/Medium": 9.99,
    "Medium/Large": 10.99,
    Small: 7.51,
    Medium: 11.29,
  };

  const handleSizeClick = (sizeOption) => {
    setSize(sizeOption);
    setSelectedPrice(selectedPrices[sizeOption]);
  };

  function handleAdd() {
    if (flavors.length > 0 && !flavor) {
      setErrorMessage("Please select a flavor.");
      return;
    }

    if (sizes.length > 0 && !size) {
      setErrorMessage("Please select a size.");
      return;
    }

    if (colors.length > 0 && !color) {
      setErrorMessage("Please select a color.");
      return;
    }

    if (!currentUser) {
      history.push("/login");
    } else {
      let userId = currentUser.id;
      let cartItem = {
        quantity,
        userId,
        productId,
        size,
        flavor,
        price: selectedPrice,
      };
      dispatch(addCartItem(cartItem));
    }

    setErrorMessage("");
  }

  function handleDelete(reviewId) {
    dispatch(deleteReview(reviewId));
  }

  useEffect(() => {
    if (product && product.price) {
      setSelectedPrice(product.price);
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const flavors = product.flavorOptions || [];
  const sizes = product.sizeOptions || [];
  const colors = product.colorOptions || [];


   const ReviewList = Object.values(reviews).map((review) => {

     if (review.productId === productId || review?.productId === productId) {
       return (
         <li id="review" key={review.id}>
           <p>
             By {review.name} on{" "}
             {moment(review.createdAt).format("MMM Do YYYY")}
           </p>
           <h3>{review.title}</h3>
           <p id="review-body">{review.body}</p>
           <div className="star-rating">
             {[...Array(5)].map((star, i) => {
               const ratingValue = i + 1;
               return (
                 <FaStar
                   key={i}
                   className="star"
                   color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                   size={20}
                 />
               );
             })}
           </div>
           <div className="recommendation-text">
             {review.recommend !== null && (
               <p>
                 Would you recommend this item: {review.recommend ? "Yes" : "No"}
               </p>
             )}
           </div>
           <div className="review-buttons">
             <button
               onClick={() => {
                 handleDelete(review.id);
               }}
             >
               Delete Review
             </button>
             <Link to={`/reviews/edit/${review.id}`}>Edit Review</Link>
           </div>
         </li>
       );
     } else if (review?.productId === productId) {
       return (
         <li id="review" key={review.id}>
           <p>
             By {review.name} on{" "}
             {moment(review.createdAt).format("MMM Do YYYY")}
           </p>
           <h3>{review.title}</h3>
           <p id="review-body">{review.body}</p>
         </li>
       );
     }
   });


  return (
    <>
      <header id="category">{product.category}</header>
      <div className="product-show-page">
        <img
          id="product-show-img"
          src={product.imageUrl}
          alt={`${product.name}`}
        />
        <div className="info-and-options-container">
          <div className="product-show-info">
            <h1>{product.name}</h1>
            <div className="rating-price">
              <div className="rating-show">
                <StarRatingDisplay rating={product.rating} />
                <p>{product.rating}</p>
              </div>
              <div id="show-price" className="product-price-show">
                <span className="price-label">Price: </span>
                <span className="price-value">
                  {selectedPrice !== undefined
                    ? `$${selectedPrice.toFixed(2)}`
                    : "Loading..."}
                </span>
              </div>
            </div>

            <div className="options-section">
              {(product.category === "Dog Toys" ||
                product.category === "Cat Toys") &&
              colors.length ? (
                <div className="color-section">
                  <h3>Color: {color}</h3>
                  <div className="color-buttons">
                    {colors.map((colorOption, index) => (
                      <button
                        key={index}
                        name="color"
                        className={color === colorOption ? "selected" : ""}
                        value={colorOption}
                        onClick={() => setColor(colorOption)}
                      >
                        {colorOption}
                      </button>
                    ))}
                  </div>
                </div>
              ) : flavors.length ? (
                <div className="flavor-section">
                  <h3>Flavor: {flavor}</h3>
                  <div className="flavor-buttons">
                    {flavors.map((flavorOption, index) => (
                      <button
                        key={index}
                        name="flavor"
                        className={flavor === flavorOption ? "selected" : ""}
                        value={flavorOption}
                        onClick={() => setFlavor(flavorOption)}
                      >
                        {flavorOption}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="size-section">
                <h3>Size: {size} </h3>
                <div className="size-buttons">
                  {sizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      className={size === sizeOption ? "selected" : ""}
                      onClick={() => handleSizeClick(sizeOption)}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="add-to-cart-quantity-section">
          <div className="quantity-text-wrapper">
            <fieldset>
              <legend>Quantity</legend>
              <select
                className="quantity-dropdown"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
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
              </select>
            </fieldset>
            <div className="text-container">
              <p className="in-stock-text">In stock</p>
              <p className="info-text">
                <strong>FREE 1-3 day delivery</strong> over $35
              </p>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="add-to-cart-from-show" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>

      <hr className="show-divider" />
      <div className="product-show-details">
        <h2>About This Item</h2>
        <p>{product.details}</p>
      </div>
      <div className="reviews">
        <h1>Reviews</h1>
        <Link id="review-link" to={`/review/${productId}`}>
          Write a Review
        </Link>
        <ul className="review-list">{ReviewList}</ul>
      </div>
    </>
  );
}

export default ProductShow;
