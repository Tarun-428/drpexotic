import { create } from 'zustand'
import { api } from '@/lib/api'
import type { AdminUser } from '@/types/cms'

const TOKEN_KEY = 'drp-admin-token'
const USER_KEY = 'drp-admin-user'

function readToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

function readUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdminUser
  } catch {
    return null
  }
}

type AuthState = {
  token: string | null
  admin: AdminUser | null
  hydrating: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  restore: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: readToken(),
  admin: readUser(),
  hydrating: false,
  async login(email, password) {
    const response = await api.adminLogin(email, password)
    localStorage.setItem(TOKEN_KEY, response.access_token)
    localStorage.setItem(USER_KEY, JSON.stringify(response.admin))
    set({ token: response.access_token, admin: response.admin })
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ token: null, admin: null, hydrating: false })
  },
  async restore() {
    const token = get().token
    if (!token) {
      set({ hydrating: false, admin: null })
      return
    }

    set({ hydrating: true })
    try {
      const admin = await api.adminMe(token)
      localStorage.setItem(USER_KEY, JSON.stringify(admin))
      set({ admin, hydrating: false })
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      set({ token: null, admin: null, hydrating: false })
    }
  },
}))
