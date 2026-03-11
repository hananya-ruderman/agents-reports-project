import { create } from "zustand"
import { userService } from "../services/userService"
import type { UserStore, UserDTO } from "../types/index"

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsres: async () => {
    set({ isLoading: true })
    const users = await userService.fetchUsers() 
    set({ users, isLoading: false })
  },

  createUser: async (user: UserDTO) => {
    await userService.createUser(user)
    get().fetchUsres() 
  }
}))