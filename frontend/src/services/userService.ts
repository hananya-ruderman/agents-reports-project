import { fetchUsersApi, createUserApi } from "../api/userApi"
import type { UserDTO } from "../types/index"

export const userService = {
  fetchUsers: async () => await fetchUsersApi(), // כאן ניתן להוסיף לוגיקה עסקית
  createUser: async (user: UserDTO) => await createUserApi(user)
}