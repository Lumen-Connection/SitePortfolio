import { useRef, useState, useEffect, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ArrowRight, ArrowLeft, ExternalLink, Download, Code2 } from 'lucide-react'
import { categories, sectionProjects as projects, ProjectItem } from '@/app/portfolioData'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { hasMedia, isVideoSource } from '@/lib/media'
import { sanitizeUrl } from '@/lib/url'

const DEFAULT_BANNER = '/videos/banners/video-banner.webm'

const ProjectCard = memo(function ProjectCard({ project, index, onSaibaMais }: {
  project: typeof projects[0]
  index: number
  onSaibaMais: () => void
}) {
  const hasValidBanner = hasMedia(project.bannerImage) && !project.bannerImage.startsWith('/api/placeholder')
  const mediaSrc = hasValidBanner ? project.bannerImage : project.image
  const bannerIsVideo = isVideoSource(mediaSrc)

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group h-[300px] sm:h-[340px] md:h-[380px] w-full border border-white/10 hover:border-white/25 transition-colors"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {bannerIsVideo ? (
        <video
          aria-label={`Demonstração visual de ${project.title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      ) : (
        <img
          src={mediaSrc}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-6" style={{ backgroundColor: project.color }} />
          <span
            className="text-[10px] font-medium tracking-[0.25em] uppercase"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1.5 leading-tight tracking-tight text-white">
            {project.title}
          </h3>
          <p className="text-white/90 text-xs line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        <motion.button
          type="button"
          className="relative w-full py-2.5 border border-white/20 text-xs font-medium tracking-wide flex items-center justify-center gap-2 text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          whileTap={{ scale: 0.98 }}
          onClick={onSaibaMais}
          aria-label={`Saiba mais sobre ${project.title}`}
        >
          <CornerBrackets />
          Saiba mais <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  )
})

const ItemCard = memo(function ItemCard({ item, index }: { item: ProjectItem; index: number }) {
  const itemHasMedia = hasMedia(item.image)
  const isVideo = isVideoSource(item.image)

  return (
    <motion.div
      className="relative overflow-hidden group h-[240px] sm:h-[260px] md:h-[280px] w-full border border-white/10 hover:border-white/25 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {itemHasMedia && (
        isVideo ? (
          <video
            src={item.image}
            aria-label={`Demonstração visual de ${item.title}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className={`relative z-10 h-full flex flex-col p-5 ${itemHasMedia ? 'justify-end' : 'justify-center items-center text-center'}`}>
        <h4 className="text-white font-semibold mb-1.5 leading-tight tracking-tight">{item.title}</h4>
        <p className="text-white/60 text-xs line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        {item.downloadUrl ? (
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={sanitizeUrl(item.downloadUrl)}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              aria-label={`Baixar ${item.title}`}
            >
              <Download aria-hidden="true" className="w-3.5 h-3.5" />
              Download
            </a>
            {item.url && (
              <a
                href={sanitizeUrl(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-white/85 hover:text-white hover:border-white/35 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={`Acessar código aberto de ${item.title}`}
              >
                <CornerBrackets />
                <Code2 aria-hidden="true" className="w-3.5 h-3.5" />
                Código Aberto
              </a>
            )}
          </div>
        ) : (
          item.url && (
            <a
              href={sanitizeUrl(item.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-orange-400 hover:text-orange-300 transition-colors"
            >
              Ver projeto <ExternalLink aria-hidden="true" className="w-3 h-3" />
            </a>
          )
        )}
      </div>
    </motion.div>
  )
})

export function ProjectsSection({ pendingCategory, viewAllTrigger }: { pendingCategory?: string | null; viewAllTrigger?: number }) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [activeSubcategory, setActiveSubcategory] = useState('Todos')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pendingCategory) { setActiveCategory(pendingCategory); setActiveSubcategory('Todos') }
  }, [pendingCategory])

  useEffect(() => {
    if (viewAllTrigger && viewAllTrigger > 0) { setActiveCategory('Todos'); setActiveSubcategory('Todos') }
  }, [viewAllTrigger])

  const { scrollYProgress: bannerScrollProgress } = useScroll({ target: bannerRef, offset: ['start start', 'end start'] })
  const bannerDimming = useTransform(bannerScrollProgress, [0, 0.6], [0, 1])
  const bannerBlurAmount = useTransform(bannerScrollProgress, [0, 0.5], [0, 16])
  const bannerBlur = useMotionTemplate`blur(${bannerBlurAmount}px)`

  const isDetailView = activeCategory !== 'Todos'
  const activeProject = projects.find((p) => p.category === activeCategory)

  const subcategories = activeProject
    ? ['Todos', ...Array.from(new Set(activeProject.items.filter((i) => i.subcategory).map((i) => i.subcategory as string)))]
    : []
  const hasSubcategories = subcategories.length > 1

  const visibleItems = activeProject
    ? activeSubcategory === 'Todos'
      ? activeProject.items
      : activeProject.items.filter((i) => i.subcategory === activeSubcategory)
    : []

  const bannerIsVideo = DEFAULT_BANNER.endsWith('.webm') || DEFAULT_BANNER.endsWith('.mp4')

  const handleSaibaMais = useCallback((category: string) => {
    setActiveCategory(category)
    setActiveSubcategory('Todos')
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  const handleBackToAll = useCallback(() => {
    setActiveCategory('Todos')
    setActiveSubcategory('Todos')
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  return (
    <>
      <section id="projects" ref={bannerRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div className="absolute inset-0 scale-110" style={{ filter: bannerBlur }}>
            {bannerIsVideo ? (
              <video
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                src={DEFAULT_BANNER}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${DEFAULT_BANNER})` }}
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/75 via-[#000000]/50 to-[#000000]" />
        </div>
        <motion.div className="absolute inset-0 bg-[#000000] z-[1]" style={{ opacity: bannerDimming }} />
        <div className="relative z-10 h-full w-full flex flex-col justify-end items-center px-5 sm:px-6 pb-14 sm:pb-20">
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel color="#f97316" className="mb-4 sm:mb-5">Portfólio</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-[1.05] tracking-tight text-white">
              Criado no <span style={{ color: '#f97316' }}>Blender</span>
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore nosso portfólio diverso de soluções inovadoras criadas com precisão e criatividade.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="projects-content" aria-labelledby="projects-heading" className="pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-14 md:pb-24 relative bg-black">
        <h2 id="projects-heading" className="sr-only">Serviços e Projetos</h2>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isDetailView
            ? `Mostrando categoria: ${activeCategory}${activeSubcategory !== 'Todos' ? `, subcategoria: ${activeSubcategory}` : ''}. ${visibleItems.length} itens.`
            : `Mostrando todos os serviços. ${projects.length} categorias.`}
        </div>
        <div className="flex justify-center mb-6 sm:mb-8">
          <SectionLabel color="#f97316">Serviços</SectionLabel>
        </div>
        <div className="container mx-auto px-5 sm:px-6">
          <motion.div
            className="relative mb-8 sm:mb-12 -mx-5 sm:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sm:hidden pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black to-transparent z-10" aria-hidden />
            <div className="sm:hidden pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black to-transparent z-10" aria-hidden />
            <div
              className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-5 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filtrar por categoria"
            >
              {categories.map((category) => {
                const active = activeCategory === category
                return (
                  <motion.button
                    key={category}
                    role="tab"
                    aria-selected={active}
                    className={`relative shrink-0 snap-start px-4 sm:px-5 py-2 text-[10px] sm:text-xs font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300 ${
                      active
                        ? 'bg-white text-black'
                        : 'border border-white/15 text-white/80 hover:border-white/35 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => { setActiveCategory(category); setActiveSubcategory('Todos') }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {!active && <CornerBrackets />}
                    {category}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {isDetailView && activeProject ? (
              <motion.div
                key={`detail-${activeCategory}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-6 max-w-6xl mx-auto">
                  <div className="hidden sm:flex items-center gap-4">
                    <motion.button
                      onClick={handleBackToAll}
                      className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
                      whileHover={{ x: -3 }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Todos os serviços
                    </motion.button>
                    <span className="text-white/15">|</span>
                    <div className="flex items-center gap-2">
                      <span className="h-px w-6" style={{ backgroundColor: activeProject.color }} />
                      <span
                        className="text-[11px] font-medium tracking-[0.2em] uppercase"
                        style={{ color: activeProject.color }}
                      >
                        {activeProject.title}
                      </span>
                    </div>
                  </div>

                  <div className="sm:hidden flex flex-col gap-3">
                    <motion.button
                      onClick={handleBackToAll}
                      className="relative w-full min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 border border-white/30 bg-white/5 text-white text-xs font-semibold tracking-[0.2em] uppercase active:bg-white/10 transition-colors"
                      whileTap={{ scale: 0.98 }}
                      aria-label="Voltar para todos os serviços"
                    >
                      <CornerBrackets />
                      <ArrowLeft className="w-4 h-4" />
                      Todos os serviços
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <span className="h-px w-6" style={{ backgroundColor: activeProject.color }} />
                      <span
                        className="text-[11px] font-medium tracking-[0.2em] uppercase"
                        style={{ color: activeProject.color }}
                      >
                        {activeProject.title}
                      </span>
                    </div>
                  </div>
                </div>
                {hasSubcategories && (
                  <div className="relative max-w-6xl mx-auto mb-8 -mx-5 sm:mx-auto">
                    <div className="sm:hidden pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black to-transparent z-10" aria-hidden />
                    <div className="sm:hidden pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black to-transparent z-10" aria-hidden />
                    <div
                      className="flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-5 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      role="tablist"
                      aria-label="Filtrar por subcategoria"
                    >
                      {subcategories.map((sub) => {
                        const active = activeSubcategory === sub
                        return (
                          <motion.button
                            key={sub}
                            role="tab"
                            aria-selected={active}
                            className={`relative shrink-0 snap-start px-4 py-1.5 text-[10px] font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 ${
                              active
                                ? 'text-black'
                                : 'border border-white/15 text-white/80 hover:border-white/35 hover:text-white hover:bg-white/5'
                            }`}
                            style={active ? { backgroundColor: activeProject.color } : {}}
                            onClick={() => setActiveSubcategory(sub)}
                            whileTap={{ scale: 0.97 }}
                          >
                            {!active && <CornerBrackets />}
                            {sub}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSubcategory}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
                  >
                    {visibleItems.map((item, index) => (
                      <ItemCard key={item.id} item={item} index={index} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto" layout>
                  <AnimatePresence mode="popLayout">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProjectCard
                          project={project}
                          index={index}
                          onSaibaMais={() => handleSaibaMais(project.category)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {mounted && createPortal(
          <AnimatePresence>
            {isDetailView && (
              <motion.div
                key="mobile-floating-back-wrapper"
                className="sm:hidden fixed bottom-5 left-5 z-[55]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  data-a11y-filter="true"
                  onClick={handleBackToAll}
                  className="flex items-center gap-2 px-4 py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase shadow-lg shadow-black/40 active:scale-[0.96] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  aria-label="Voltar para todos os serviços"
                >
                  <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                  Voltar
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </section>
    </>
  )
}