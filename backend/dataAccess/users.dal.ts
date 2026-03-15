import { getDB } from "../utils/dbConn.js";
import type { User } from "../models/types.js";
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb";


export async function getUserByAgentCode(agentCode: string): Promise<User | null> {
  const db = getDB();
  const users = db.collection<User>("Users");
  const user = await users.findOne({ agentCode});
  return user
}

export async function createSuperAdmin() {
    const db = getDB();

  const users = db.collection<User>("Users");

  const existingAdmin = await users.findOne({ role: "Admin" });
  if (existingAdmin) {
    console.log("Super admin already exists:", existingAdmin.agentCode);
    return;
  }

  const password = process.env.ADMIN_PASSWORD as string;
  const passwordHash = await bcrypt.hash(password, 10);

  const superAdmin: User = {
    agentCode: "admin1",
    fullName: "hananya",
    role: "Admin",
    passwordHash,
    createdAt: new Date()
  };

  const result = await users.insertOne(superAdmin);
  console.log("Super admin created with ID:", result.insertedId);
  console.log("Login with agentCode:", superAdmin.agentCode, "password:", password);

}




export async function createUser(user: Omit<User, "_id">) {
    const db = getDB();
    const users = db.collection<User>("Users");
    
    const result = await users.insertOne(user);
    return result.insertedId;
}

export async function getAllUsers(): Promise<User[]> {
    const db = getDB();
    const users = db.collection<User>("Users");
    const result = await users.find().toArray();
    return result
}

export async function getUserById(id: string): Promise<User | null> {
  const db = getDB();
  const users = db.collection<User>("Users");

  return users.findOne({
    _id: new ObjectId(id)
  });
}