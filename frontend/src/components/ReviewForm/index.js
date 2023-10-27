import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { submitReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import "./ReviewForm.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = useParams().productId;
  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!currentUser) {
      history.push("/login");
    } else {
      let review = { name, title, body, productId };
      dispatch(submitReview(review)).then(() => {
        history.push(`/products/${productId}`);
      });
    }
  }

  return (
    <div className="review-page">
      <div className="review-headers">
        <h1>Write a Review</h1>
        {/* product image and title should go here as well */}
      </div>
      <div>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Review Subject"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            id="review-body-create"
            type="textarea"
            placeholder="Your Review"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <div className="review-radios">
            <h1>Would you recommend this product to a friend?</h1>
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
