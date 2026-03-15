import { create } from "zustand"
import { userService } from "../services/userService"
import type { UserStore, UserDTO } from "../types/index"
import { createUserApi, fetchUsersApi } from "../api/userApi"

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true })
    const users = await fetchUsersApi() 
    set({ users, isLoading: false })
  },

  createUser: async (user: UserDTO) => {
    await createUserApi(user)
    get().fetchUsers() 
  }
}))