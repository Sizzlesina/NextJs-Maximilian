import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // Get the event id from the request query
  const eventId = req.query.eventId;
  // ----------------------------------------------------------------------------------
  // @ Mongodb connect
  const uri = process.env.MONGODB_URI;
  const client = await MongoClient.connect(uri);
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
    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    // ----------------------------------------------------------------------------------

    // Set a new id for the newly created comment
    newComment.id = result.insertedId;

    // Return a status and a message which show the operation done successfully
    res.status(201).json({ message: "Added comment!", comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Sina", comment: "A first comment" },
      { id: "c2", name: "Ali", comment: "A second comment" },
    ];
    res.status(200).json({ comments: dummyList });
  }
  // ----------------------------------------------------------------------------------
  // ! Close the mongodb connection
  client.close();
  // ----------------------------------------------------------------------------------
}
