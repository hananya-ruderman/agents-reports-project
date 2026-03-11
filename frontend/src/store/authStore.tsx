import { create } from "zustand"
import { authService } from "../services/authServices"
import type { AuthStore, LoginRequest } from "../types/index"



export const useAuthStore = create<AuthStore>((set) => ({

  user: null,
  token: null,
  isLoading: false,

  login: async (data: LoginRequest) => {

    set({ isLoading: true })

    const res = await authService.login(data)

    localStorage.setItem("token", res.token)
    localStorage.setItem("user", JSON.stringify(res.user))

    set({
      token: res.token,
      user: res.user,
      isLoading: false
    })
  },

  logout: () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    set({
      user: null,
      token: null
    })
  },

  loadUserFromStorage: () => {

    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {

      set({
        token,
        user: JSON.parse(user)
      })

    }
  }

}))