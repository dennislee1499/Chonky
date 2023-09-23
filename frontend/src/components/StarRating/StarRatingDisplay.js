import React from "react";

const StarRatingDisplay = ({ rating }) => {
  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map((value) => (
        <div key={value} className={rating >= value ? "filled" : "empty"}>
          <i className="fa fa-star"></i>
        </div>
      ))}
    </div>
  );
};

export default StarRatingDisplay;
