import api from "./axios"
import type { User, UserDTO } from "../types/index"

export const fetchUsersApi = async () => {
  const { data } = await api.get<User[]>("/users")
  return data
}

export const createUserApi = async (user: UserDTO) => {
  await api.post("/users", user)
}