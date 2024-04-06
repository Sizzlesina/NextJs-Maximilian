import { connectDatabase, insertDocument } from "../../lib/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract data and variables
    const { email, name, message } = req.body;
    let client;

    // Server side validations
    if (
      !email ||
      !name ||
      !message ||
      !email.includes("@") ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    // Create a new object
    const newMessage = {
      email,
      name,
      message,
    };

    // Connecting to database with error handling
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Could not connect to the database!" });
      return;
    }

    // Insert data to database with error handling
    try {
      const result = await insertDocument(client, "messages", newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Stroing message failed!" });
      return;
    }

    //! Close the connection to database
    client.close();
    // Return a success response and the result data
    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}
