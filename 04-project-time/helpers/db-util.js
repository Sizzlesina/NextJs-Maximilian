import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // Get the uri from the .env.local file
  const uri = process.env.MONGODB_URI;

  // Connecting to the Mongodb
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  // Accessing the events database
  const db = client.db("events");

  // Insert one cell to the data table
  const result = await db.collection(collection).insertOne(document);
  return result;
}
export async function getAllDocuments(client, collection, sort) {
  const db = client.db("events");

  // Fetch all the comments from mongodb : Sort is descending
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
