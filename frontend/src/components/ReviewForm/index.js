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
  const [formError, setFormError] = useState({});
  const [recommend, setRecommend] = useState(null);

  function handleReviewSubmit(e) {
    e.preventDefault();

    let errors = {};

    if (!rating) {
      errors.rating = 'Please select a rating';
    }
    if (!name.trim()) {
      errors.name = 'Name field required'
    }
    if (!title.trim()) {
      errors.title = 'Title field required'
    }
    if (!body.trim()) {
      errors.body = 'Body field required'
    }

    setFormError(errors);

    if (Object.keys(errors).length === 0 && currentUser) { 
    let review = { name, title, body, productId, rating, recommend };
    dispatch(submitReview(review)).then(() => {
      history.push(`/products/${productId}`);
    });
  } else if (!currentUser) {
    history.push("/login");
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
                    onClick={() => {
                      setRating(ratingValue);
                      setFormError((prevErrors) => ({
                        ...prevErrors,
                        rating: null,
                      }));
                    }}
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
          {formError.rating && (
            <p className="form-error-message">{formError.rating}</p>
          )}
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
              setFormError((prevErrors) => ({
                ...prevErrors,
                name: null,
              }));
            }}
          />
          {formError.name && (
            <p className="form-error-message">{formError.name}</p>
          )}
          <input
            type="text"
            placeholder="Title your review"
            onChange={(e) => {
              setTitle(e.target.value);
              setFormError((prevErrors) => ({
                ...prevErrors,
                title: null,
              }));
            }}
          />
          {formError.title && (
            <p className="form-error-message">{formError.title}</p>
          )}
          <input
            id="review-body-create"
            type="textarea"
            placeholder="Tell us more"
            onChange={(e) => {
              setBody(e.target.value);
              setFormError((prevErrors) => ({
                ...prevErrors,
                body: null,
              }));
            }}
          />
          {formError.body && (
            <p className="form-error-message">{formError.body}</p>
          )}
          <div className="review-radios">
            <h1>Would you recommend this item?</h1>
            <label>
              Yes
              <input
                type="radio"
                name="rec"
                value="Yes"
                checked={recommend === true}
                onChange={() => setRecommend(true)}
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name="rec"
                value="No"
                checked={recommend === false}
                onChange={() => setRecommend(false)}
              />
            </label>
          </div>
          <input id="review-submit" type="submit" value="Submit Review" />
        </form>
      </div>
    </div>
  );
}
