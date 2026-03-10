import type { Request, Response } from "express";
import { loginUser } from "../services/auth.services.js";

export async function userLogin(req: Request, res: Response) {

  const { agentCode, password } = req.body;

  if (!agentCode || !password) {
    return res
      .status(400)
      .json({ error: "agentCode and password are required" });
  }

  try {
    const result = await loginUser(agentCode, password);

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}


export function getMe(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id, agentCode, fullName, role } = req.user;
  res.status(200).json({ user: { id, agentCode, fullName, role } });
}