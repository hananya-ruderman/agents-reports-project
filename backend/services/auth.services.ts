import { getUserByAgentCode } from "../dataAccess/users.dal.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function loginUser(agentCode: string, password: string){
    const user = await getUserByAgentCode(agentCode)
    if (!user) return null

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return null

    const token = jwt.sign(
        {id: user.id, roll: user.role},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    )

    return {
        token,
        user: {
            id: user.id,
            agentCode: user.agentCode,
            fullname: user.fullName,
            role: user.role
        }
    }
}

