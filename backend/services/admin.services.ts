import { getUserByAgentCode, createUser, getAllUsers } from "../dataAccess/users.dal.js"; 
import { User } from "../models/types.js";
import { getInitialPassword } from "../utils/password.js";
import bcrypt from "bcryptjs";


export async function registerUser(agentCode: string, fullName: string, role: "Admin" | "Agent", password?: string) {
    const existing = await getUserByAgentCode(agentCode);
    if (existing) throw new Error("agentCode already exists");

    let initialPassword
    if (!password){
        initialPassword = getInitialPassword(fullName)
    }else{
        initialPassword = password
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(initialPassword, saltRounds);
    const newUser: Omit<User, "id"> = {
        agentCode,
        fullName,
        role,
        passwordHash: initialPassword,
        createdAt: new Date()
    };

    const id = await createUser(newUser);

    return {
        user: {
            id,
            agentCode,
            fullName,
            role
        },
        initialPasswordHint: initialPassword
    };
}

export async function listUsers() {
    const allUsers = await getAllUsers();
    return allUsers.map(u => ({
        id: u.id,
        agentCode: u.agentCode,
        fullName: u.fullName,
        role: u.role,
        createdAt: u.createdAt
    }));
}
