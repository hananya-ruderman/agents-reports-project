import {create} from 'zustand'

type AuthState = {
  user: any
  token: string | null
  isAuthenticated: boolean
  login: (user: any, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,

    login: (user, token) => {
        localStorage.setItem('token', token)

        set({
            user, 
            token,
            isAuthenticated: true
        })
    },
    logout: () => {
        localStorage.removeItem('token')

        set({
            user:null, 
            token: null,
            isAuthenticated: false
        })
    }
}))

