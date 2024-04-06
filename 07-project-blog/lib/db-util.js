import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // URI
  const uri = process.env.MONGODB_URI;

  // Connecting to the Mongodb
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  // Accessing the database
  const db = client.db("blog");

  // Insert to data database
  const result = await db.collection(collection).insertOne(document);
  return result;
}
