import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../store/products";
import { submitReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import "./ReviewForm.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = useParams().productId;
  const product = useSelector((state) => state.products[productId]);
  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [formError, setFormError] = useState(null);

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!rating) {
      setFormError('Please select a rating');
      return;
    }

    if (!currentUser) {
      history.push("/login");
    } else {
      let review = { name, title, body, productId, rating };
      dispatch(submitReview(review)).then(() => {
        history.push(`/products/${productId}`);
      });
    }
  }

  useEffect(() => {
    dispatch(fetchProduct(productId)); 
  }, [dispatch, productId]);

  return (
    <div className="review-page">
      <div className="review-headers">
        <h1>Write a Review</h1>
        <img
          id="product-review-img"
          src={product.imageUrl}
          alt={`${product.name}`}
        />
      </div>
      <div>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <h2>Choose your rating</h2>
          <div>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          {formError && <p className="form-error-message">{formError}</p>}
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Title your review"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            id="review-body-create"
            type="textarea"
            placeholder="Tell us more"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <div className="review-radios">
            <h1>Would you recommend this item?</h1>
            <label>
              Yes
              <input type="radio" name="rec" />
            </label>
            <label>
              No
              <input type="radio" name="rec" />
            </label>
          </div>
          <input id="review-submit" type="submit" value="Submit Review" />
        </form>
      </div>
    </div>
  );
}
