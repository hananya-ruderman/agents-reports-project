import { getUserByAgentCode, getUserById } from "../dataAccess/users.dal.js";
import jwt from "jsonwebtoken";
import type { User } from "../models/types.js";
import bcrypt from "bcryptjs";

export async function loginUser(agentCode: string, password: string) {
  const user: User | null = await getUserByAgentCode(agentCode);
  
  if (!user) return null;
  
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return null;

  const id = user._id!.toString();


  const token = jwt.sign(
    { id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id,
      agentCode: user.agentCode,
      fullName: user.fullName,
      role: user.role,
    },
  };
}

export async function getCurrentUser(userId: string) {

  const user = await getUserById(userId);

  if (!user) return null;

  return {
    id: user._id!.toString(),
    agentCode: user.agentCode,
    fullName: user.fullName,
    role: user.role
  };
}