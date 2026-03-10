import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export function authenticateToken(req: Request, res: Response, next: NextFunction){
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.status(401).json({error: "token is missing"})

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user)=>{
        if (err) return res.status(401).json({error: "invalid token"})
        req.user = user as any
        next()
    })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).json({ error: "Admin privileges required" });
    }
    next();
}



