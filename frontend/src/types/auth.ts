import type { User } from "./user.ts"

export type LoginResponse = {
  token: string
  user: User
}

export type LoginRequest = {
    agentCode: string
    password: string
}

