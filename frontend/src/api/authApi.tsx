import api from "./axios"
import type { LoginRequest, LoginResponse} from "../types/index"

export const loginApi = async (data: LoginRequest) => {
  const { data: result } = await api.post<LoginResponse>("auth/login", data)
  return result
}