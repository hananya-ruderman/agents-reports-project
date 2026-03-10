import { MongoClient, Db } from "mongodb";
import bcrypt from "bcryptjs";
import type { User } from "../models/types.js";


let db: Db | null = null;

export async function connectDB() {
  const client = new MongoClient(process.env.DB_URI as string);
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
}

export function getDB(): Db {
  if (!db) throw new Error("Database not connected");
  return db;
}



