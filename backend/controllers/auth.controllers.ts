import type { Request, Response } from "express";
import { loginUser } from "../services/auth.services.js";
import { getCurrentUser } from "../services/auth.services.js";


export async function userLogin(req: Request, res: Response) {
  console.log(req.cookies["loggedInUser"]);
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
    res.cookie("loggedInUser", result.token, {maxAge: 1000*60*60*60, secure:true, sameSite: "none"})
    
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}


export async function getMe(req: Request, res: Response) {

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {

    const user = await getCurrentUser(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });

  } catch (err) {

    console.error(err);
    return res.status(500).json({ error: "Server error" });

  }
}