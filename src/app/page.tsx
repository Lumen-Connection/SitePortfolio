'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { SuccessCasesSection } from '@/components/SuccessCasesSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SecondBanner } from '@/components/SecondBanner'
import { AboutSection } from '@/components/AboutSection'
import { CTASection } from '@/components/CTASection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import { heroProjects } from '@/app/portfolioData'

export default function Portfolio() {
  const [pendingCategory, setPendingCategory] = useState<string | null>(null)
  const [viewAllTrigger, setViewAllTrigger] = useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const activeColor = heroProjects[activeSlideIndex]?.color ?? '#f97316'

  const handleVerProjeto = (category: string) => {
    setPendingCategory(category)
    setTimeout(() => {
      document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleVerPortfolio = () => {
    setViewAllTrigger((n) => n + 1)
    setTimeout(() => {
      document.getElementById('projects-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlideIndex(index)
  }, [])

  return (
    <>
    <Header activeColor={activeColor} />
    <div id="a11y-content" className="min-h-screen bg-black text-white overflow-x-hidden">
      <main id="main-content" tabIndex={-1}>
        <HeroSection onVerProjeto={handleVerProjeto} onSlideChange={handleSlideChange} />
        <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[200px] rounded-full blur-[100px] transition-all duration-[1200ms] ease-in-out"
            style={{ background: `radial-gradient(ellipse, ${activeColor}20 0%, transparent 70%)` }}
          />
        </div>
        <AboutSection activeColor={activeColor} />
        <SuccessCasesSection />
        <ProjectsSection pendingCategory={pendingCategory} viewAllTrigger={viewAllTrigger} />
        <SecondBanner />
        <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] rounded-full blur-[110px] bg-orange-500/5" />
        </div>
        <CTASection onVerPortfolio={handleVerPortfolio} />
        <div aria-hidden="true" className="relative h-0 overflow-visible pointer-events-none z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] rounded-full blur-[110px] bg-orange-500/5" />
        </div>
        <ContactSection />
      </main>
      <Footer />
      </div>
      <AccessibilityWidget />
    </>
  )
}
