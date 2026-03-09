import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

dotenv.config(); 

const uri = process.env.DB_URI as string; 

const client = new MongoClient(uri);

let db: Db;

export async function connectDB() {
    console.log(uri);
  try {
    await client.connect();
    db = client.db("ReportsSystem");
    console.log('Connected to MongoDB');
    return db
  } catch (err) {
    console.error('Connection error', err);
  }
}






export function getDB() {
  if (!db) throw new Error('Database not connected');
  return db;
}