export const CONTACT = {
  phoneE164: '5583999614629',
  phoneDisplay: '(83) 99961-4629',
  email: 'contato@lumenconnection.com',
  location: 'João Pessoa, PB',
} as const

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${CONTACT.phoneE164}`
  if (!message || message.trim().length === 0) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function buildProjectInterestMessage(category: string): string {
  const safe = category.trim()
  return `Olá, estou interessado(a) em Projeto do ${safe}`
}

export function buildMailtoUrl(subject?: string): string {
  const base = `mailto:${CONTACT.email}`
  if (!subject || subject.trim().length === 0) return base
  return `${base}?subject=${encodeURIComponent(subject)}`
}
