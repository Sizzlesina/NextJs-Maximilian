import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract the data from request body
    const userEmail = req.body.email;

    // Get the uri from the .env.local file
    const uri = process.env.MONGODB_URI;

    // Connecting to the Mongodb
    const client = await MongoClient.connect(uri);

    // Accessing the newsletter
    const db = client.db("events");

    // Insert one cell to the data table
    await db.collection("emails").insertOne({ email: userEmail });

    // Close the client
    client.close();

    // Return a message as a response
    res.status(200).json({ message: "Signed up" });
  }
}
