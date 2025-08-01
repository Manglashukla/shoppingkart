// frontend/src/pages/Review.js
import React, { useState } from "react";

const Review = () => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    alert("Thanks for your review: " + review);
    setReview("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Write a Review</h2>
      <textarea
        rows="6"
        cols="50"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review here..."
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Submit Review
      </button>
    </div>
  );
};

export default Review;
