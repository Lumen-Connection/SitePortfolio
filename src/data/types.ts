import type { LucideIcon } from 'lucide-react'

export type ProjectItem = {
  id: number
  title: string
  description: string
  image: string
  url?: string
  downloadUrl?: string
  subcategory?: string
}

export type HeroSlideExtra = {
  ctaLabel?: string
  ctaHref?: string
  subtitle?: string
}

export type Project = {
  id: number
  title: string
  category: string
  description: string
  stats: string
  color: string
  gradient: string
  icon: LucideIcon
  image: string
  bannerImage: string
  items: ProjectItem[]
  subtitle?: string
  showInHero?: boolean
  heroOnly?: boolean
  ctaLabel?: string
  ctaHref?: string
}

export type SuccessCase = {
  imagem: string
  nome: string
  descrição: string
  descriçãoLonga?: string
  url?: string
  tagLabel?: string
}

export type NavItem = {
  label: string
  href: string
}
