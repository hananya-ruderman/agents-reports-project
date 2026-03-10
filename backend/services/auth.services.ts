import { getUserByAgentCode } from "../dataAccess/users.dal.js";
import jwt from "jsonwebtoken";
import type { User } from "../models/types.js";
import bcrypt from "bcryptjs";

export async function loginUser(agentCode: string, password: string) {
  const user: User | null = await getUserByAgentCode(agentCode);
  console.log(user);
  
  if (!user) return null;
  
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return null;

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      agentCode: user.agentCode,
      fullName: user.fullName,
      role: user.role,
    },
  };
}