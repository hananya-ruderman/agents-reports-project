import { ObjectId } from "mongodb";

// db types

export interface User{
    _id?: ObjectId;
    agentCode:  string;
    fullName: string;
    passwordHash: string;
    role: "Admin" | "Agent";
    createdAt: Date;
}

export interface Report{
    _id?: ObjectId,
    userId: string,
    category: string,
    urgency: string,
    message: string,
    imagePath?: string,
    sourceType: "form" | "csv",
    createdAt: Date
}

export type NewReport  = Omit<Report, "_id">

// request types

export interface AuthUser {
  id: string;
  role: "Admin" | "Agent";
}

declare global {
    namespace Express{
        interface Request{
            user?: AuthUser;
            
        }
    }
}


