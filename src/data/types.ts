import type { LucideIcon } from 'lucide-react'

export type ProjectItem = {
  id: number
  title: string
  title_en?: string
  description: string
  description_en?: string
  image: string
  url?: string
  downloadUrl?: string
  desktopOnly?: boolean
  gallery?: string[]
  subcategory?: string
  subcategory_en?: string
}

export type HeroSlideExtra = {
  ctaLabel?: string
  ctaHref?: string
  subtitle?: string
}

export type Project = {
  id: number
  title: string
  title_en?: string
  category: string
  category_en?: string
  description: string
  description_en?: string
  stats: string
  stats_en?: string
  color: string
  gradient: string
  icon: LucideIcon
  image: string
  bannerImage: string
  items: ProjectItem[]
  subtitle?: string
  subtitle_en?: string
  showInHero?: boolean
  heroOnly?: boolean
  ctaLabel?: string
  ctaLabel_en?: string
  ctaHref?: string
}

export type SuccessCase = {
  imagem: string
  nome: string
  nome_en?: string
  descrição: string
  descrição_en?: string
  descriçãoLonga?: string
  descriçãoLonga_en?: string
  url?: string
  tagLabel?: string
  tagLabel_en?: string
}

export type NavItem = {
  label: string
  href: string
}
