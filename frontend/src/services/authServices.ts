import { loginApi } from "../api/authApi"
import type { LoginRequest } from "../types/index"

export const authService = {
  login: async (data: LoginRequest) => {
    
      return await loginApi(data)
  }
}