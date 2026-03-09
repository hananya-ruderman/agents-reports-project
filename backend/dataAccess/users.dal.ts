import { getDB } from "../utils/dbConn.js";
import type { User } from "../models/types.js";


export async function getUserByAgentCode(agentCode:string): Promise<User | null> {
    const db  = getDB()
    const users = db.collection<User>('Users')
   return await users.findOne({agentCode})
}




