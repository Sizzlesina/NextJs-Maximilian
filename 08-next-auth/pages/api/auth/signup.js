import { MongoClient } from "mongodb";
import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db-util";

export default async function handler(req, res) {
  // Only do the operations inside the function when the request method is a POST request
  if (req.method !== "POST") {
    return;
  }

  // Extract the data from request body
  const data = req.body;
  const { email, password } = data;

  // Server side validations
  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input!" });
    return;
  }

  // Connecting to the database
  const client = await connectToDatabase();
  const db = client.db(process.env.mongodb_database);

  // Check if the user exists
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }
  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Send the result data to database
  const result = await db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });

  // Return a response from the server
  res.status(201).json({ messag: "Created user!" });
  client.close();
}
