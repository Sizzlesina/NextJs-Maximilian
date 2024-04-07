import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // URI
  const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.5yponfa.mongodb.net/admin`;

  // Connecting to the Mongodb
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  // Accessing the database
  const db = client.db(process.env.mongodb_database);

  // Insert to data database
  const result = await db.collection(collection).insertOne(document);
  return result;
}
// Check for the result (connection string changed)
