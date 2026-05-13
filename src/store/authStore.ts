import { create } from 'zustand'

const SESSION_KEY = 'drp-admin-session'

function readSession(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(SESSION_KEY)
}

type AuthState = {
  session: string | null
  login: (password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: readSession(),
  login: (password) => {
    const expected =
      (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? 'drp-admin-change-me'
    if (password !== expected) return false
    const token = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, token)
    set({ session: token })
    return true
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_KEY)
    set({ session: null })
  },
}))
