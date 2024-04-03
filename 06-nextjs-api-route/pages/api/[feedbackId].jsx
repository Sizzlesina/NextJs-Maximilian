import { buildFeedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
  // Get feedback id from the request sent to the api route
  const feedbackId = req.query.feedbackId;

  // Going to the feedback.json path and then extract the data inside
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  // Select the feedback that have the id sent to the api
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  // Return the selected feedback with a status
  res.status(200).json({ feedback: selectedFeedback });
}
