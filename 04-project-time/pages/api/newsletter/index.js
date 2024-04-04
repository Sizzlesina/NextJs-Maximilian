import { connectDatabase, insertDocument } from "../../../helpers/db-util.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract the data from request body
    const userEmail = req.body.email;
    let client;

    // Connecting to the database but with error handling
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    // Inserting data to the database BUT with error handlingc
    try {
      await insertDocument(client, "emails", { email: userEmail });
      // Close the client
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // Return a message as a response
    res.status(200).json({ message: "Signed up" });
  }
}
