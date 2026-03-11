export type Role = "Admin" | "Agent"


export interface User {
  id: string
  agentCode: string
  fullName: string
  role: Role
}

export interface UserDTO {
  agentCode: string;
  password: string;
  role: Role
}

export interface UsersResponse {
  users: User[]
}

