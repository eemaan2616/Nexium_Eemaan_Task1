import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
