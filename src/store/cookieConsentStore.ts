import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CookieConsent = 'unknown' | 'accepted' | 'declined'

type CookieState = {
  consent: CookieConsent
  setConsent: (c: Exclude<CookieConsent, 'unknown'>) => void
}

export const useCookieConsentStore = create(
  persist<CookieState>(
    (set) => ({
      consent: 'unknown',
      setConsent: (c) => set({ consent: c }),
    }),
    { name: 'drp-cookie-consent-v1' },
  ),
)
