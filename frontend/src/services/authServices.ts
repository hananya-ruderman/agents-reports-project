import { loginApi } from "../api/authApi"
import type { LoginRequest } from "../types/index"

export const authService = {
  login: async (data: LoginRequest) => {
    // כאן ניתן להוסיף כל לוגיקה עסקית אם נדרש
    return await loginApi(data)
  }
}