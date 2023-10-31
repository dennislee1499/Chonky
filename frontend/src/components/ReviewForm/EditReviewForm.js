import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ReviewForm.css";
import { editReview } from "../../store/reviews";
import { fetchProduct } from "../../store/products";
import { FaStar } from "react-icons/fa";

export default function EditReviewForm() {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const history = useHistory();
  const reviewId = useParams().reviewId;
  const review = reviews[reviewId];
  const productId = review.productId;
  const product = useSelector((state) => state.products[productId]);
  const [name, setName] = useState(review?.name);
  const [title, setTitle] = useState(review?.title);
  const [body, setBody] = useState(review?.body);
  const [rating, setRating] = useState(review?.rating);

  function handleEditReview(e) {
    e.preventDefault();
    let review = { name, title, body, rating };
    dispatch(editReview(reviewId, review)).then(() => {
      history.push(`/products/${productId}`);
    });
  }

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);


  return (
    <div className="review-page">
      <div className="review-headers">
        <h1>Edit Review</h1>
        <img
          id="product-edit-review-img"
          src={product.imageUrl}
          alt={`${product.name}`}
        />
      </div>
      <div>
        <form className="review-form" onSubmit={handleEditReview}>
          <div>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    checked={ratingValue === rating}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    size={30}
                  />
                </label>
              );
            })}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Title your review"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            id="review-body-create"
            type="textarea"
            placeholder="Tell us more"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <input id="review-submit" type="submit" value="Edit Review" />
        </form>
      </div>
    </div>
  );
}
