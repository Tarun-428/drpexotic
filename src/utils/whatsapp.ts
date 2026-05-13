export function digitsOnly(input: string) {
  return input.replace(/\D/g, '')
}

export function buildWhatsAppUrl(phoneE164Digits: string, message?: string) {
  const n = digitsOnly(phoneE164Digits)
  if (!n) return 'https://wa.me/'
  const base = `https://wa.me/${n}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
