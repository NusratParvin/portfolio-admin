// import { MongoClient } from "mongodb";

// let dbClient: MongoClient | null = null;

// async function connectToDatabase() {
//   if (!process.env.MONGODB_URI) {
//     throw new Error("MongoDB URI is required!");
//   }

//   if (!dbClient) {
//     try {
//       dbClient = new MongoClient(process.env.MONGODB_URI);
//       await dbClient.connect();
//       console.log("Connected to MongoDB");
//     } catch (err) {
//       console.error("Error connecting to MongoDB:", err);
//       throw err;
//     }
//   }

//   return dbClient.db(); // Return the database instance
// }

// export default connectToDatabase;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// To prevent multiple connections during hot reloading in development
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
