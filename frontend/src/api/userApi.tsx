import api from "./axios"
import type { User, UserDTO } from "../types/index"

export const fetchUsersApi = async () => {
  const data = await api.get("/admin/users")
  const users: User[] = data.data
  return users
}

export const createUserApi = async (user: UserDTO) => {
  await api.post("/admin/users", user)
}