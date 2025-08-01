// frontend/src/pages/Feedback.js
import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    alert("Thanks for your feedback: " + feedback);
    setFeedback("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Give Feedback</h2>
      <textarea
        rows="6"
        cols="50"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your feedback here..."
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
