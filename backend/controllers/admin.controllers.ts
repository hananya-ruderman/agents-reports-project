import type { Request, Response } from "express";
import { registerUser, listUsers } from "../services/admin.services.js";


export async function createNewUser(req :Request, res: Response){
    const { agentCode, fullName, role } = req.body;

    if (!agentCode || !fullName || !role){
        return res.status(400).json({ error: "Missing required fields" })};

    try {
        const result = await registerUser(agentCode, fullName, role);
        res.status(201).json(result);
    } catch (err: any) {
        if (err.message.includes("exists")) return res.status(409).json({ error: err.message });
        res.status(500).json({ error: "Server error" });
    }

}

export async function listAllUsers(req: Request, res: Response) {
    try {
        const users = await listUsers();
        res.status(200).send( users );
    } catch {
        res.status(500).json({ error: "Server error" });
    }
}


    


