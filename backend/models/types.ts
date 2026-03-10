import { ObjectId } from "mongodb";

export interface User{
    id?: string;
    agentCode:  string;
    fullName: string;
    passwordHash: string;
    role: "Admin" | "Agent";
    createdAt: Date;
}

export interface Report{
    _id?: string,
    userId: string,
    category: string,
    urgency: string,
    message: string,
    imagePath?: string,
    sourceType: "json" | "csv",
    createdAt: Date
}

declare global {
    namespace Express{
        interface Request{
            user?: User & {
                role: "Admin" | "Agent"
            };
            file?: File & {path: string};

        }
    }
}


