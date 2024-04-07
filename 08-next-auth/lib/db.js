import { MongoClient } from "mongodb";

async function connectDatabase() {
  // Should connect the database in here (Database wont work)
  const client = await MongoClient.connect();
}
