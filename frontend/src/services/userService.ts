import { fetchUsersApi, createUserApi } from "../api/userApi"
import type { UserDTO } from "../types/index"

export const userService = {
  fetchUsers: async () => await fetchUsersApi(), 
  createUser: async (user: UserDTO) => await createUserApi(user)
}