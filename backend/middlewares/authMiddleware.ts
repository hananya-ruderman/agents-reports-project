import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AuthUser } from "../models/types.js";

export function authenticateToken(req: Request, res: Response, next: NextFunction){
    console.log("ppppp");
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.status(401).json({error: "token is missing"})

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded)=>{
        if (err) return res.status(401).json({error: "invalid token"})
        req.user = decoded as AuthUser
        next()
    })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).json({ error: "Admin privileges required" });
    }
    next();
}



