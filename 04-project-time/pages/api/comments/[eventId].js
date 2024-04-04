import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  // Get the event id from the request query
  const eventId = req.query.eventId;
  // ----------------------------------------------------------------------------------
  // @ Mongodb connect
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connect to the database failed!" });
    return;
  }
  // ----------------------------------------------------------------------------------

  if (req.method === "POST") {
    // Extract data from request body
    const { email, name, text } = req.body;

    // Add server side validations
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    // Create a new comment object
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    // ----------------------------------------------------------------------------------
    // @ Inset data to the database
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (err) {
      res.status(500).json({ message: "Inserting comment failed!" });
      return;
    }
    // ----------------------------------------------------------------------------------

    // Set a new id for the newly created comment
    newComment._id = result.insertedId;

    // Return a status and a message which show the operation done successfully
    res.status(201).json({ message: "Added comment!", comment: newComment });
  }

  if (req.method === "GET") {
    // Fetch all comments from the database
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      // Return the fetched comments
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  // ----------------------------------------------------------------------------------
  // ! Close the mongodb connection
  client.close();
  // ----------------------------------------------------------------------------------
}
