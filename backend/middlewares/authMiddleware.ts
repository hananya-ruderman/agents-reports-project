import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AuthUser } from "../models/types.js";

export function authenticateToken(req: Request, res: Response, next: NextFunction){
    const token = req.cookies["loggedInUser"]
    if (!token) return res.status(401).json({error: "token is missing"})

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any)=>{
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



