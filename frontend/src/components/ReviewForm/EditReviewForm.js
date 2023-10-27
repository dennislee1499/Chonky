import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ReviewForm.css";
import { editReview } from "../../store/reviews";

export default function EditReviewForm() {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const history = useHistory();
  const reviewId = useParams().reviewId;
  const review = reviews[reviewId];
  const productId = review.productId;
  const [name, setName] = useState(review?.name);
  const [title, setTitle] = useState(review?.title);
  const [body, setBody] = useState(review?.body);

  function handleEditReview(e) {
    e.preventDefault();
    let review = { name, title, body };
    dispatch(editReview(reviewId, review)).then(() => {
      history.push(`/products/${productId}`);
    });
  }

  return (
    <div className="review-page">
      <div className="review-headers">
        <h1>Edit Review</h1>
        {/* product image and title should go here as well */}
      </div>
      <div>
        <form className="review-form" onSubmit={handleEditReview}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            id="review-body-create"
            type="textarea"
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
