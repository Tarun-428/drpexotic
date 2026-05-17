/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_WHATSAPP_PHONE?: string
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string
  readonly VITE_ADMIN_PASSWORD?: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  readonly VITE_NEWSLETTER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
