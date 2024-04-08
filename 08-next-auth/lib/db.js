import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.5yponfa.mongodb.net/admin`;
  const client = await MongoClient.connect(uri);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(process.env.mongodb_database);
  const result = await db.collection(collection).insertOne(document);

  return result;
}

