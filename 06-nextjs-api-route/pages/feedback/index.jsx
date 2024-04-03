import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index.js";

function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();

  // Handle Load Feedback Details For Selected Feedback
  function handleLoadFeedback(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }

  return (
    <>
      {/* Show feedback details conditionaly  */}
      {feedbackData && <p>{feedbackData.email}</p>}

      {/* Show all feedbacks  */}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={handleLoadFeedback.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// Pre-rendering data that we get from the json file
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
