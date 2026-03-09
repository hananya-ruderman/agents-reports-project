import { Request, Response } from "express";
import { loginUser } from "../services/auth.services.js";

export function userLogin(req: Request, res: Response){
    const {agentCode, password} = req.body

    if (!agentCode || !password){
        return res.status(400).json({error: "agentCode and password are requested"})
    }

    try {
        const result = loginUser(agentCode, password)
        if (!result){
            res.status(401).json({error: "Invalid credentials"})
        }
        res.status(200).json(result)
    }catch (err){
        console.error(err)
        res.status(500).json({ error: "server error"})
    }
}

export async function getMe(req: Request, res: Response) {
  const user = req.user; 
  res.status(200).json({ user });
}