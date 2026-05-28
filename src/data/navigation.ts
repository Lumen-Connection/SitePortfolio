import type { NavItem } from './types'

export const categories: string[] = [
  'Todos',
  'Desenvolvimento Web',
  'Desenvolvimento de Software',
  'Desenvolvimento Mobile',
  'Edição de Vídeo e Mídia Social',
  'Design Gráfico, Branding e Identidade Visual',
  'Posters',
  'Modelagem 3D',
  'Edição de VFX',
]

export const categoryTranslationKey: Record<string, string> = {
  'Todos': 'projects.categoryAll',
  'Desenvolvimento Web': 'category.webDev',
  'Desenvolvimento de Software': 'category.softwareDev',
  'Desenvolvimento Mobile': 'category.mobileDev',
  'Edição de Vídeo e Mídia Social': 'category.videoEditing',
  'Design Gráfico, Branding e Identidade Visual': 'category.design',
  'Posters': 'category.posters',
  'Modelagem 3D': 'category.modeling3d',
  'Edição de VFX': 'category.vfx',
}

export const navItems: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Casos de sucesso', href: '#success-cases' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
]
