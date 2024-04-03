import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const client = await MongoClient.connect(
      "mongodb+srv://sizzlesina:kFiTZy8b5cA6lYra@cluster0.5yponfa.mongodb.net/admin"
    );
    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();
    res.status(200).json({ message: "Signed up" });
  }
}
