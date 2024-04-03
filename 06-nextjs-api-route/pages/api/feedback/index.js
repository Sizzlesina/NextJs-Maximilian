import fs from "fs";
import path from "path";

// A function to create the filePath which is the feedback.json file path
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

// A function to extract the data inside the filePath given to it
export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

// Handler function to handle POST and GET requests
export default function handler(req, res) {
  // Handling POST requests
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // Store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  }
  // Handling GET requests
  else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
