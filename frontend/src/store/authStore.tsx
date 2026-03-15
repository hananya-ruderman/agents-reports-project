import { create} from "zustand"
import {persist} from "zustand/middleware"
import { authService } from "../services/authServices"
import type { AuthStore, LoginRequest } from "../types/index"


export const useAuthStore= create <AuthStore>()(persist((set) => ({

  user: null,
  token: null,
  isLoading: false,

  login: async (data: LoginRequest) => {

    set({ isLoading: true })

    const res = await authService.login(data)
    set({
      token: res.token,
      user: res.user,
      isLoading: false
    })
  },

  logout: () => {

    
    set({
      user: null,
      token: null
    })
  },

  

}),{
  name: "usersStorage"
}
))